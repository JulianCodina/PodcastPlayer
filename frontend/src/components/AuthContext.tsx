import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase.tsx';




type AudioFav = {
  id: number;
  title: string;
  URLmp3: string;
  URLimg: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLogged: boolean;
  dataFav: AudioFav[] | null;
  InsertAudio: (id: number, title: string, URLmp3: string, URLimg: string) => Promise<void>;
  DeleteAudio: (audioId: number) => Promise<void>;
  getAudiosForProfile: () => Promise<AudioFav[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [dataFav, setDataFav] = useState<AudioFav[]>([]);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLogged(!!session?.user);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLogged(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (username: string, password: string) => {
    const email = `${username}@app.local`;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setIsLogged(true);
    
    // Obtener los audios relacionados al usuario después de iniciar sesión
    const audios = await getAudiosForProfile();
    const formattedAudios = audios.map(audio => ({
      id: audio.id,
      title: audio.title,
      URLmp3: audio.URLmp3,
      URLimg: audio.URLimg,
    }));
    setDataFav(formattedAudios); // Mapea los audios a dataFav
  };

  const signUp = async (username: string, password: string) => {
    const email = `${username}@app.local`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    signOut();
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setIsLogged(false);
  };  

  const updateDataFav = async () => {
    const audios = await getAudiosForProfile();
    const formattedAudios = audios.map(audio => ({
      id: audio.id,
      title: audio.title,
      URLmp3: audio.URLmp3,
      URLimg: audio.URLimg,
    }));
    setDataFav(formattedAudios); // Actualiza dataFav
  };

  const InsertAudio = async (id: number, title: string, URLmp3: string, URLimg: string): Promise<void> => {
    const { user } = useAuth(); // Obtener el contexto de autenticación
    const profileId = user?.id; // Asumiendo que el ID del perfil es el mismo que el ID del usuario
  
    if (!profileId) {
      throw new Error('Could not obtain the profile ID');
    }
  
    const { data, error } = await supabase
      .from('profiles_audios')
      .insert([
        { pid: profileId, aid: id, audios: { title, URLmp3, URLimg } }
      ]);
  
    if (error) {
      console.error('Error inserting audio:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  
    await updateDataFav(); // Actualiza dataFav después de insertar un audio
    return; // Ensure the function returns void
  };
  const DeleteAudio = async(audioId: number): Promise<void> => {
    const { user } = useAuth(); // Obtener el contexto de autenticación
    const profileId = user?.id; // Asumiendo que el ID del perfil es el mismo que el ID del usuario
  
    if (!profileId) {
      throw new Error('No se pudo obtener el ID del perfil');
    }
  
    const { data, error } = await supabase
      .from('profiles_audios')
      .delete()
      .eq('pid', profileId)
      .eq('aid', audioId);
  
    if (error) {
      console.error('Error deleting audio:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
    await updateDataFav();
    return;
  }
  const getAudiosForProfile = async(): Promise<AudioFav[]> => {
  const { user } = useAuth(); // Obtener el contexto de autenticación
  const profileId = user?.id; // Asumiendo que el ID del perfil es el mismo que el ID del usuario

  if (!profileId) {
    throw new Error('Could not obtain the profile ID');
  }

  const { data, error } = await supabase
    .from('profiles_audios')
    .select('aid, title, URLmp3, URLimg')
    .eq('pid', profileId);

  if (error) {
    console.error('Error fetching audios:', error);
    return [];
  }

  // Map the data to match the AudioFav type
  return data.map(audio => ({
    id: audio.aid, // Ensure to include the id property
    title: audio.title,
    URLmp3: audio.URLmp3,
    URLimg: audio.URLimg,
  }));
}

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isLogged, dataFav, InsertAudio, DeleteAudio, getAudiosForProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
