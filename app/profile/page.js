'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [mypost, seMyPost] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      seMyPost(data);
    };
    if (session?.user.id) fetchPost();
  }, [session?.user.id]);
  const handleEdit = () => {};
  const handleDelete = async () => {};
  return (
    <Profile
      name="Amar"
      desc="Welcome to your personlaize page"
      data={mypost}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
