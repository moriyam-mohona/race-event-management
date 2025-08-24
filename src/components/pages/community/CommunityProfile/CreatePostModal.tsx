"use client";

import React, { useState } from "react";
import { X, ChevronDown, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import human from "@/assets/images/Human.png";
import { useCreatePostOnCommunityMutation } from "@/redux/features/community/communityApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useParams } from "next/navigation";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PostFormData {
  content: string;
  category: string;
  image: File | null;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
}) => {
  const id = useParams().id;
  const { data: currentUser } = useGetMeQuery({});
  const [createPostOnCommunity] = useCreatePostOnCommunityMutation({});

  const [formData, setFormData] = useState<PostFormData>({
    content: "",
    category: "General post",
    image: null,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const postCategories = [
    { label: "Rideshare", value: "RIDE_SHARE" },
    { label: "Couch Share", value: "COUCH_SHARE" },
    { label: "Room Share", value: "ROOM_SHARE" },
    { label: "General post", value: "GENERAL_POST" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    const dataToSubmit = new FormData();
    const postData = {
      author: currentUser?.username,
      content: formData.content,
      category: formData.category,
      image: formData.image ? formData.image.name : null,
      timestamp: new Date().toISOString(),
    };

    console.log("Post Data:", postData);

    const body = {
      communityId: id,
      description: formData.content,
      category: formData.category,
    };

    dataToSubmit.append("data", JSON.stringify(body));

    if (formData.image) {
      dataToSubmit.append("image", formData.image);
    }

    const response = await handleAsyncWithToast(() =>
      createPostOnCommunity(dataToSubmit)
    );

    if (response?.data?.success) {
      // Reset form
      setFormData({ content: "", category: "General post", image: null });
      setImagePreview(null);
      onClose();
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({ content: "", category: "General post", image: null });
    setImagePreview(null);
    setIsDropdownOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={handleCancel} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto">
          {/* Content */}
          <div className="p-4">
            {/* User Info & Category Dropdown */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={currentUser?.data?.profileImage || human}
                    alt={currentUser?.data?.fullName}
                    width={40}
                    height={40}
                    className="bg-gray-100 w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="ml-3 font-medium text-gray-900">
                    {currentUser?.data?.fullName}
                  </span>
                  {/* Category Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <span>{formData.category}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setIsDropdownOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                          {postCategories.map((category) => (
                            <button
                              key={category.value}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  category: category.value,
                                }));
                                setIsDropdownOpen(false);
                              }}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-black hover:font-semibold hover:bg-green-50 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Text Area */}
            <div className="mb-4">
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Body text"
                className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Image Upload Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                {/* Image Preview or Upload Button */}
                {imagePreview ? (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <label className="w-20 h-20 border-2 border-dashed border-green-900/20 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <ImagePlus className="h-8 w-8 text-green-900/20" />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-red-400 hover:text-white rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.content.trim()}
              className="px-8 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;
