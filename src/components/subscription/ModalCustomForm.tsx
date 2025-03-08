import { useState } from 'react';
import { ServiceType } from '../../constants/serviceCategory';

interface ModalCustomFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customService: ServiceType) => void;
}

const ModalCustomForm = ({ isOpen, onClose, onSubmit }: ModalCustomFormProps) => {
  const [customServiceName, setCustomServiceName] = useState('');

  const handleCustomServiceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomServiceName(e.target.value);
  };

  const handleCustomServiceSubmit = () => {
    if (customServiceName.trim()) {
      const customService: ServiceType = {
        name: customServiceName.trim(),
        image: '',
      };
      onSubmit(customService);
      setCustomServiceName('');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20">
          <div className="w-96 rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">서비스 직접 입력</h2>
              <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">서비스 이름</label>
              <input
                type="text"
                value={customServiceName}
                onChange={handleCustomServiceNameChange}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="서비스 이름을 입력하세요"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleCustomServiceSubmit}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                disabled={!customServiceName.trim()}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCustomForm;
