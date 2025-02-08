import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/actions/userActions";
import { toast } from "react-toastify";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ProfilePage = () => {
  useDocumentTitle("Profile");
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin || {});
  const { loading, success, error } = useSelector(
    (state) => state.userUpdateProfile || {}
  );

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully");
      // Clear password fields after successful update
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const updateData = {
      name,
      oldPassword,
      newPassword,
    };

    dispatch(updateUserProfile(updateData));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Profile</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={userInfo?.email || ""}
            className="w-full p-2 border rounded bg-gray-100"
            disabled
          />
        </div>

        <div>
          <label className="block mb-1">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Required for password changes"
          />
        </div>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div>
          <label className="block mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Confirm new password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
