import { useState } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const EditableNotes = ({ notes, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);

  const handleSave = () => {
    onSave(localNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalNotes(notes);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-700">📝 Personal Notes</span>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={localNotes}
            onChange={(e) => setLocalNotes(e.target.value)}
            rows="3"
            className="input-field resize-none"
            placeholder="Add your personal notes, reminders, or modifications..."
          />
          <div className="flex justify-end space-x-2">
            <button onClick={handleCancel} className="btn-ghost text-sm">
              <XMarkIcon className="h-4 w-4 mr-1" />
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary text-sm">
              <CheckIcon className="h-4 w-4 mr-1" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600 bg-white rounded-lg p-3 min-h-[60px]">
          {localNotes || 'No notes added yet. Click edit to add your thoughts.'}
        </div>
      )}
    </div>
  );
};

export default EditableNotes;
