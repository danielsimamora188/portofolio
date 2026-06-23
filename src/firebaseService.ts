import { 
  collection, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Project, Experience, Biodata, SkillCategory, ServiceItem } from './types';
import { personalData, projectsData, experienceData, skillsData, servicesData } from './data';
import { isSupabaseConnected } from './supabase';
import * as supabaseService from './supabaseService';

const PROJECTS_COLLECTION = 'projects';
const MESSAGES_COLLECTION = 'contacts';
const EXPERIENCES_COLLECTION = 'experiences';
const BIODATA_COLLECTION = 'biodata';
const BIODATA_DOC_ID = 'personal-bio';
const SERVICES_COLLECTION = 'services';
const SKILLS_COLLECTION = 'skills';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Info: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize/seed projects if database is empty
export async function initializeProjectsIfNeeded() {
  try {
    const q = collection(db, PROJECTS_COLLECTION);
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log('Firestore projects collection is empty. Seeding initial data from projectsData...');
      for (const proj of projectsData) {
        // Use custom document IDs matching data.ts IDs
        const docRef = doc(db, PROJECTS_COLLECTION, proj.id);
        await setDoc(docRef, {
          title: proj.title,
          category: proj.category,
          description: proj.description,
          imageUrl: proj.imageUrl || '',
          buttonLink: proj.buttonLink || '',
          detailText: proj.detailText || '',
          specs: proj.specs || '',
          createdAt: new Date().toISOString()
        });
      }
      return true;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, PROJECTS_COLLECTION);
  }
  return false;
}

// Fetch all projects (sorted by createdAt or custom ordering)
export async function getProjects(): Promise<Project[]> {
  if (isSupabaseConnected()) {
    return await supabaseService.getProjectsFromSupabase();
  }
  try {
    await initializeProjectsIfNeeded();
    const q = collection(db, PROJECTS_COLLECTION);
    const snapshot = await getDocs(q);
    const projects: Project[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        title: data.title || '',
        category: data.category || 'web',
        description: data.description || '',
        imageUrl: data.imageUrl || '',
        buttonLink: data.buttonLink || '',
        detailText: data.detailText || '',
        specs: data.specs || ''
      });
    });
    return projects;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, PROJECTS_COLLECTION);
  }
}

// Add a new project
export async function addProjectInFirestore(project: Omit<Project, 'id'> & { id?: string }): Promise<string> {
  if (isSupabaseConnected()) {
    return await supabaseService.addProjectInSupabase(project);
  }
  const id = project.id || `proj-${Date.now()}`;
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await setDoc(docRef, {
      title: project.title,
      category: project.category,
      description: project.description,
      imageUrl: project.imageUrl || '',
      buttonLink: project.buttonLink || '',
      detailText: project.detailText || '',
      specs: project.specs || '',
      createdAt: new Date().toISOString()
    });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${PROJECTS_COLLECTION}/${id}`);
  }
}

// Update an existing project
export async function updateProjectInFirestore(id: string, updates: Partial<Omit<Project, 'id'>>): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.updateProjectInSupabase(id, updates);
  }
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PROJECTS_COLLECTION}/${id}`);
  }
}

// Delete a project
export async function deleteProjectFromFirestore(id: string): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.deleteProjectFromSupabase(id);
  }
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PROJECTS_COLLECTION}/${id}`);
  }
}

// Submitting a contact message
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
  status: 'unread' | 'read';
}

export async function addContactMessage(name: string, email: string, message: string): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.addContactMessageInSupabase(name, email, message);
  }
  try {
    const colRef = collection(db, MESSAGES_COLLECTION);
    await addDoc(colRef, {
      name,
      email,
      message,
      status: 'unread',
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, MESSAGES_COLLECTION);
  }
}

// Retrieve message submissions (sorted with newest first)
export async function getContactMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConnected()) {
    return await supabaseService.getContactMessagesFromSupabase();
  }
  try {
    const colRef = collection(db, MESSAGES_COLLECTION);
    const snapshot = await getDocs(colRef);
    const messages: ContactMessage[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        message: data.message || '',
        status: data.status || 'unread',
        createdAt: data.createdAt || new Date().toISOString()
      });
    });
    
    // Sort by createdAt descending
    return messages.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, MESSAGES_COLLECTION);
  }
}

// Update message status (e.g. read / unread)
export async function updateMessageStatus(id: string, status: 'unread' | 'read'): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.updateMessageStatusInSupabase(id, status);
  }
  try {
    const docRef = doc(db, MESSAGES_COLLECTION, id);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${MESSAGES_COLLECTION}/${id}`);
  }
}

// Delete message
export async function deleteMessageFromFirestore(id: string): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.deleteMessageFromSupabase(id);
  }
  try {
    const docRef = doc(db, MESSAGES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${MESSAGES_COLLECTION}/${id}`);
  }
}

// Experience Seed/Initialize
export async function initializeExperiencesIfNeeded() {
  try {
    const q = collection(db, EXPERIENCES_COLLECTION);
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log('Firestore experiences collection is empty. Seeding initial data from experienceData...');
      for (const exp of experienceData) {
        const docRef = doc(db, EXPERIENCES_COLLECTION, exp.id);
        await setDoc(docRef, {
          company: exp.company,
          location: exp.location,
          role: exp.role,
          period: exp.period,
          imageUrl: exp.imageUrl || '',
          description: exp.description,
          details: exp.details || [],
          createdAt: new Date().toISOString()
        });
      }
      return true;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, EXPERIENCES_COLLECTION);
  }
  return false;
}

// Fetch all experiences
export async function getExperiences(): Promise<Experience[]> {
  if (isSupabaseConnected()) {
    return await supabaseService.getExperiencesFromSupabase();
  }
  try {
    await initializeExperiencesIfNeeded();
    const q = collection(db, EXPERIENCES_COLLECTION);
    const snapshot = await getDocs(q);
    const experiences: Experience[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      experiences.push({
        id: doc.id,
        company: data.company || '',
        location: data.location || '',
        role: data.role || '',
        period: data.period || '',
        imageUrl: data.imageUrl || '',
        description: data.description || '',
        details: data.details || []
      });
    });
    return experiences;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, EXPERIENCES_COLLECTION);
  }
}

// Add experience
export async function addExperienceInFirestore(exp: Omit<Experience, 'id'> & { id?: string }): Promise<string> {
  if (isSupabaseConnected()) {
    return await supabaseService.addExperienceInSupabase(exp);
  }
  const id = exp.id || `exp-${Date.now()}`;
  try {
    const docRef = doc(db, EXPERIENCES_COLLECTION, id);
    await setDoc(docRef, {
      company: exp.company,
      location: exp.location,
      role: exp.role,
      period: exp.period,
      imageUrl: exp.imageUrl || '',
      description: exp.description,
      details: exp.details || [],
      createdAt: new Date().toISOString()
    });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${EXPERIENCES_COLLECTION}/${id}`);
  }
}

// Update experience
export async function updateExperienceInFirestore(id: string, updates: Partial<Omit<Experience, 'id'>>): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.updateExperienceInSupabase(id, updates);
  }
  try {
    const docRef = doc(db, EXPERIENCES_COLLECTION, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${EXPERIENCES_COLLECTION}/${id}`);
  }
}

// Delete experience
export async function deleteExperienceFromFirestore(id: string): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.deleteExperienceFromSupabase(id);
  }
  try {
    const docRef = doc(db, EXPERIENCES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${EXPERIENCES_COLLECTION}/${id}`);
  }
}

// Biodata Seed/Initialize
export async function initializeBiodataIfNeeded(): Promise<Biodata> {
  try {
    const docRef = doc(db, BIODATA_COLLECTION, BIODATA_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log('Biodata in Firestore is empty. Seeding initial data from personalData...');
      await setDoc(docRef, {
        fullName: personalData.fullName || '',
        shortName: personalData.shortName || '',
        title: personalData.title || '',
        email: personalData.email || '',
        whatsapp: personalData.whatsapp || '',
        whatsappLink: personalData.whatsappLink || '',
        instagram: personalData.instagram || '',
        instagramLink: personalData.instagramLink || '',
        linkedin: personalData.linkedin || '',
        githubCV: personalData.githubCV || '',
        cvFilename: personalData.cvFilename || '',
        aboutMe: personalData.aboutMe || '',
        experienceYears: personalData.experienceYears || '',
        projectsCompletedCount: personalData.projectsCompletedCount || '',
        supportAvailability: personalData.supportAvailability || '',
        avatarUrl: personalData.avatarUrl || ''
      });
      return personalData as Biodata;
    }
    return docSnap.data() as Biodata;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${BIODATA_COLLECTION}/${BIODATA_DOC_ID}`);
  }
}

// Fetch Biodata from Firestore
export async function getBiodataFromFirestore(): Promise<Biodata> {
  if (isSupabaseConnected()) {
    return await supabaseService.getBiodataFromSupabase();
  }
  try {
    const docRef = doc(db, BIODATA_COLLECTION, BIODATA_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return await initializeBiodataIfNeeded();
    }
    const data = docSnap.data();
    return {
      fullName: data.fullName || '',
      shortName: data.shortName || '',
      title: data.title || '',
      email: data.email || '',
      whatsapp: data.whatsapp || '',
      whatsappLink: data.whatsappLink || '',
      instagram: data.instagram || '',
      instagramLink: data.instagramLink || '',
      linkedin: data.linkedin || '',
      githubCV: data.githubCV || '',
      cvFilename: data.cvFilename || '',
      aboutMe: data.aboutMe || '',
      experienceYears: data.experienceYears || '',
      projectsCompletedCount: data.projectsCompletedCount || '',
      supportAvailability: data.supportAvailability || '',
      avatarUrl: data.avatarUrl || ''
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${BIODATA_COLLECTION}/${BIODATA_DOC_ID}`);
  }
}

// Update Biodata in Firestore
export async function updateBiodataInFirestore(updates: Partial<Biodata>): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.updateBiodataInSupabase(updates);
  }
  try {
    const docRef = doc(db, BIODATA_COLLECTION, BIODATA_DOC_ID);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${BIODATA_COLLECTION}/${BIODATA_DOC_ID}`);
  }
}

// ==========================================
// MY SERVICES CRUD & INITIALIZER
// ==========================================

export async function initializeServicesIfNeeded(): Promise<ServiceItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, SERVICES_COLLECTION));
    if (querySnapshot.empty) {
      console.log('Services in Firestore are empty. Seeding initial servicesData...');
      const seeded: ServiceItem[] = [];
      for (let i = 0; i < servicesData.length; i++) {
        const item = servicesData[i];
        const docRef = await addDoc(collection(db, SERVICES_COLLECTION), {
          title: item.title,
          description: item.description,
          icon: item.icon,
          checklist: item.checklist,
          order: i,
          createdAt: new Date().toISOString()
        });
        seeded.push({ ...item, id: docRef.id, order: i });
      }
      return seeded;
    }
    const servicesList: ServiceItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      servicesList.push({
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        icon: data.icon || 'code',
        checklist: data.checklist || [],
        order: data.order !== undefined ? data.order : 99,
      });
    });
    return servicesList.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, SERVICES_COLLECTION);
    return [];
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  if (isSupabaseConnected()) {
    return await supabaseService.getServicesFromSupabase();
  }
  try {
    const q = query(collection(db, SERVICES_COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return await initializeServicesIfNeeded();
    }
    const list: ServiceItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        icon: data.icon || 'code',
        checklist: data.checklist || [],
        order: data.order !== undefined ? data.order : 99,
      });
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, SERVICES_COLLECTION);
    return [];
  }
}

export async function addServiceInFirestore(service: Omit<ServiceItem, 'id'>): Promise<string> {
  if (isSupabaseConnected()) {
    return await supabaseService.addServiceInSupabase(service);
  }
  try {
    const qSnapshot = await getDocs(collection(db, SERVICES_COLLECTION));
    const order = service.order !== undefined ? service.order : qSnapshot.size;
    const docRef = await addDoc(collection(db, SERVICES_COLLECTION), {
      ...service,
      order,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, SERVICES_COLLECTION);
  }
}

export async function updateServiceInFirestore(id: string, updates: Partial<ServiceItem>): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.updateServiceInSupabase(id, updates);
  }
  try {
    const docRef = doc(db, SERVICES_COLLECTION, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${SERVICES_COLLECTION}/${id}`);
  }
}

export async function deleteServiceFromFirestore(id: string): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.deleteServiceFromSupabase(id);
  }
  try {
    const docRef = doc(db, SERVICES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${SERVICES_COLLECTION}/${id}`);
  }
}


// ==========================================
// MY SKILLS CRUD & INITIALIZER
// ==========================================

export async function initializeSkillsIfNeeded(): Promise<SkillCategory[]> {
  try {
    const querySnapshot = await getDocs(collection(db, SKILLS_COLLECTION));
    if (querySnapshot.empty) {
      console.log('Skills in Firestore are empty. Seeding initial skillsData...');
      const seeded: SkillCategory[] = [];
      for (let i = 0; i < skillsData.length; i++) {
        const item = skillsData[i];
        const docRef = await addDoc(collection(db, SKILLS_COLLECTION), {
          title: item.title,
          skills: item.skills,
          order: i,
          createdAt: new Date().toISOString()
        });
        seeded.push({ ...item, id: docRef.id, order: i });
      }
      return seeded;
    }
    const list: SkillCategory[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: doc.id,
        title: data.title || '',
        skills: data.skills || [],
        order: data.order !== undefined ? data.order : 99,
      });
    });
    return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, SKILLS_COLLECTION);
    return [];
  }
}

export async function getSkillsCategories(): Promise<SkillCategory[]> {
  if (isSupabaseConnected()) {
    return await supabaseService.getSkillsCategoriesFromSupabase();
  }
  try {
    const q = query(collection(db, SKILLS_COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return await initializeSkillsIfNeeded();
    }
    const list: SkillCategory[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: doc.id,
        title: data.title || '',
        skills: data.skills || [],
        order: data.order !== undefined ? data.order : 99,
      });
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, SKILLS_COLLECTION);
    return [];
  }
}

export async function addSkillCategoryInFirestore(category: Omit<SkillCategory, 'id'>): Promise<string> {
  if (isSupabaseConnected()) {
    return await supabaseService.addSkillCategoryInSupabase(category);
  }
  try {
    const qSnapshot = await getDocs(collection(db, SKILLS_COLLECTION));
    const order = category.order !== undefined ? category.order : qSnapshot.size;
    const docRef = await addDoc(collection(db, SKILLS_COLLECTION), {
      ...category,
      order,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, SKILLS_COLLECTION);
  }
}

export async function updateSkillCategoryInFirestore(id: string, updates: Partial<SkillCategory>): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.updateSkillCategoryInSupabase(id, updates);
  }
  try {
    const docRef = doc(db, SKILLS_COLLECTION, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${SKILLS_COLLECTION}/${id}`);
  }
}

// Delete skill category
export async function deleteSkillCategoryFromFirestore(id: string): Promise<void> {
  if (isSupabaseConnected()) {
    return await supabaseService.deleteSkillCategoryFromSupabase(id);
  }
  try {
    const docRef = doc(db, SKILLS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${SKILLS_COLLECTION}/${id}`);
  }
}
