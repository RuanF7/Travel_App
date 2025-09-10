import React from 'react';

interface CountryItemProps {
  country: {
    country_code: string;
    name: string;
    flag: string;
    created_at?: string | null;
  };
  onRemove: (countryCode: string) => void;
  title: string;
}

const CountryItem: React.FC<CountryItemProps> = ({ country, onRemove, title }) => {

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Data desconhecida';    
   
    const isoString = dateString.replace(' ', 'T');

    const date = new Date(isoString);
   
    if (isNaN(date.getTime())) return 'Data desconhecida';

    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-black rounded-lg p-3 relative border border-primary-darkgray transition-all hover:border-primary-orange hover:shadow-md">
      <div className="flex items-center mb-2">
        <img 
          src={country.flag} 
          alt={`Flag of ${country.name}`} 
          className="w-10 h-7 object-cover mr-2 shadow-sm"
        />
        <h3 className="font-medium text-primary-white">{country.name}</h3>
      </div>
      
      <button
        onClick={() => onRemove(country.country_code)}
        className="absolute top-2 right-2 text-primary-orange hover:text-orange-300 transition-colors"
        title={`Remover da ${title}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path 
            fillRule="evenodd" 
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
      
      <div className="text-xs text-primary-lightgray">
        Adicionado: {formatDate(country.created_at)}
      </div>
    </div>
  );
};

export default CountryItem;
