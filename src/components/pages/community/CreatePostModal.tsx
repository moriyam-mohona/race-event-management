import React, { useState } from "react";
import { X, ChevronDown, ImagePlus } from "lucide-react";
import Image from "next/image";

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
  const [formData, setFormData] = useState<PostFormData>({
    content: "",
    category: "General post",
    image: null,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const postCategories = [
    "Rideshare",
    "Couch Share",
    "Room Share",
    "General post",
  ];

  // Mock user data
  const currentUser = {
    username: "Watson Pitter",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

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

  const handleSubmit = () => {
    const postData = {
      author: currentUser.username,
      content: formData.content,
      category: formData.category,
      image: formData.image ? formData.image.name : null,
      timestamp: new Date().toISOString(),
    };

    console.log("Post Data:", postData);

    // Reset form
    setFormData({ content: "", category: "General post", image: null });
    setImagePreview(null);
    onClose();
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
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="ml-3 font-medium text-gray-900">
                    {currentUser.username}
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
                              key={category}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, category }));
                                setIsDropdownOpen(false);
                              }}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-black hover:font-semibold hover:bg-green-50 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {category}
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
