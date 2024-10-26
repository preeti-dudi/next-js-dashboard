import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      
      <div className="hidden md:block"><p className="text-[44px]">Bnb Fashions</p></div>
      <div className="block md:hidden"><p className="text-[22px]">Bnb Fashions</p></div>
    </div>
  );
}
