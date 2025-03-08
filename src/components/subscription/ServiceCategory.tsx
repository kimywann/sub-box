import { ServiceType } from '../../constants/serviceCategory';

interface ServiceCategoryProps {
  title: string;
  services: ServiceType[];
  onServiceClick: (service: ServiceType) => void;
  showCustomButton?: boolean;
  onCustomClick?: () => void;
}

const ServiceCategory = ({
  title,
  services,
  onServiceClick,
  showCustomButton,
  onCustomClick,
}: ServiceCategoryProps) => {
  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-gray-800">{title}</h2>
      <div className="flex flex-row gap-4 overflow-x-auto pb-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex h-32 w-32 flex-shrink-0 flex-col items-center justify-center rounded-md border border-gray-300 p-6 transition-colors hover:border-blue-500 hover:shadow-md"
            onClick={() => onServiceClick(service)}
          >
            <img src={service.image} alt={service.name} className="h-16 w-16 cursor-pointer object-contain" />
            <span className="mt-2 text-sm">{service.name}</span>
          </div>
        ))}

        {showCustomButton && (
          <div
            className="flex h-32 w-32 flex-shrink-0 flex-col items-center justify-center rounded-md border border-dashed border-blue-500 p-6 transition-colors hover:bg-blue-50 hover:shadow-md"
            onClick={onCustomClick}
          >
            <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-500">
              +
            </div>
            <span className="mt-2 text-sm">직접 입력</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceCategory;
