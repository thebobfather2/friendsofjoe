import { collection, getDoc, doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db, storage } from '../firebase'; // Assuming you have Firebase Storage configured

const Pfp = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image file

  useEffect(() => {
    getProfile();
  }, [user]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data } = await getDoc(
        doc(collection(db, "profiles"), user.uid)
      );

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let imageUrl = avatar_url; // Initialize imageUrl with the current avatar_url

      // Check if a new image has been selected
      if (selectedImage) {
        // Upload the selected image to Firebase Storage and get the URL
        const imageRef = db.ref().child(`avatars/${user.uid}`);
        await imageRef.put(selectedImage);
        imageUrl = await imageRef.getDownloadURL();
      }

      const updates = {
        username,
        website,
        avatar_url: imageUrl, // Update avatar_url with the new image URL
        updated_at: new Date(),
      };

      await setDoc(doc(db, "profiles", user.uid), updates);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div aria-live="polite">
      {loading ? (
        "Saving ..."
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          {/* ... Other input fields ... */}
          <div>
            <label htmlFor="avatar">Profile Picture</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </div>
          {/* ... Other input fields ... */}
          <div>
            <button className="button primary block" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
      )}
      {/* ... Other components ... */}
    </div>
  );
};

export default Pfp;
