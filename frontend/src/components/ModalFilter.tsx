import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Button from './Button';
import { useFilterStore } from '../store/useFilter';

interface IModal {
  isOpen?: boolean;
  title: string;
  positiveText?: string;
  negativeText?: string;
  onPositiveClick?: () => Promise<void> | void;
  onNegativeClick?: () => void;
}

const Modal = (props: IModal) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const { setFilter } = useFilterStore();
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    setFilter({ category, status });
  };

  return (
    <div className={`relative z-10 ${!isOpen && 'hidden'} `} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 transition-opacity bg-zinc-900 bg-opacity-40"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full text-center sm:items-center sm:p-0">
          <div className="relative p-4 overflow-hidden text-left transition-all transform bg-white rounded-md shadow-xl">
            {/* Content */}
            <div className=" p-5 w-[450px] space-y-4">
              <h2 className="text-3xl font-semibold">Filter</h2>
              <form className="space-y-6">
                <div className="flex flex-col gap-3">
                  <label htmlFor="category" className="text-lg font-medium">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="category"
                    id="category"
                    className="flex w-full h-10 px-3 py-2 text-base border rounded-md border-slate-600 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" hidden>
                      Select a category
                    </option>
                    <option value="Financial">Financial</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="status" className="text-lg font-medium">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    name="status"
                    id="status"
                    className="flex w-full h-10 px-3 py-2 text-base border rounded-md border-slate-600 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" hidden>
                      Select a status
                    </option>
                    <option value="Draft">Draft</option>
                    <option value="Published">Publish</option>
                  </select>
                </div>
                <div className={`flex justify-between mt-5`}>
                  <Button
                    text="Reset"
                    className=" bg-slate-200"
                    onClick={() => {
                      setCategory('');
                      setStatus('');
                    }}
                  />
                  <div className="space-x-4">
                    <Button
                      text="Cancel"
                      className=" bg-slate-200"
                      onClick={() => {
                        props.onNegativeClick;
                        setIsOpen(false);
                      }}
                    />

                    <Button
                      text="Filter"
                      className="text-white bg-blue-700 hover:bg-blue-800"
                      onClick={() => {
                        props.onPositiveClick && props.onPositiveClick();
                        handleFilter();
                        setIsOpen(false);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* End Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export function ShowModal(props: IModal) {
  const alert = document.createElement('div');
  alert.id = 'alert';
  document.body.appendChild(alert);
  const root = createRoot(alert);
  root.render(<Modal isOpen={true} title={props.title} negativeText={props.negativeText} positiveText={props.positiveText} onNegativeClick={props.onNegativeClick} onPositiveClick={props.onPositiveClick} />);
}
