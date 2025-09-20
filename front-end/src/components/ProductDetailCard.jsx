import React from 'react';
import { MapPin, Home, Heart, User } from 'lucide-react';

export default function ProductCard  ({
  image_url,
  title,
  category,
  description,
  price,
  quantity,
  condition,
  year_of_manufacture,
  brand,
  model,
  dimensions,
  weight,
  material,
  color,
  original_packaging,
  manual_included,
  working_condition_desc,
  username,
  phone,
  address,
  city,
  state,
  country,
  postal_code,
  location
}) {
  const formatCondition = (condition) => {
    if (!condition) return 'Unknown';
    return condition.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="flex h-full flex-1 flex-col rounded-lg min-w-60 bg-white shadow-sm border border-gray-100">
      {/* Product Image */}
      <div className="flex h-full flex-1 flex-col gap-4 rounded-lg">
        <div
          className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-lg flex flex-col"
          style={{
            backgroundImage: `url("${image_url}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h1 className="text-[#0e1b13] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
          {title}
        </h1>
        
        <p className="text-[#0e1b13] text-base font-normal leading-normal pb-3 pt-1 px-4">
          {description}
        </p>

        {/* Specifications */}
        <h3 className="text-[#0e1b13] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Specifications
        </h3>
        
        <div className="p-4 grid grid-cols-2">
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pr-2">
            <p className="text-[#50956c] text-sm font-normal leading-normal">Category</p>
            <p className="text-[#0e1b13] text-sm font-normal leading-normal">{category}</p>
          </div>
          
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pl-2">
            <p className="text-[#50956c] text-sm font-normal leading-normal">Price</p>
            <p className="text-[#0e1b13] text-sm font-normal leading-normal">{formatPrice(price)}</p>
          </div>
          
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pr-2">
            <p className="text-[#50956c] text-sm font-normal leading-normal">Quantity</p>
            <p className="text-[#0e1b13] text-sm font-normal leading-normal">{quantity}</p>
          </div>
          
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pl-2">
            <p className="text-[#50956c] text-sm font-normal leading-normal">Condition</p>
            <p className="text-[#0e1b13] text-sm font-normal leading-normal">{formatCondition(condition)}</p>
          </div>
          
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pr-2">
            <p className="text-[#50956c] text-sm font-normal leading-normal">Year</p>
            <p className="text-[#0e1b13] text-sm font-normal leading-normal">{year_of_manufacture}</p>
          </div>
          
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pl-2">
            <p className="text-[#50956c] text-sm font-normal leading-normal">Brand</p>
            <p className="text-[#0e1b13] text-sm font-normal leading-normal">{brand}</p>
          </div>
          
          {model && (
            <>
              <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pr-2">
                <p className="text-[#50956c] text-sm font-normal leading-normal">Model</p>
                <p className="text-[#0e1b13] text-sm font-normal leading-normal">{model}</p>
              </div>
              
              <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pl-2">
                <p className="text-[#50956c] text-sm font-normal leading-normal">Dimensions</p>
                <p className="text-[#0e1b13] text-sm font-normal leading-normal">{dimensions}</p>
              </div>
            </>
          )}
          
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pr-2">
            <p className="text-[#50956c] text-sm font-normal leading-normal">Weight</p>
            <p className="text-[#0e1b13] text-sm font-normal leading-normal">{weight}</p>
          </div>
          
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pl-2">
            <p className="text-[#50956c] text-sm font-normal leading-normal">Material</p>
            <p className="text-[#0e1b13] text-sm font-normal leading-normal">{material}</p>
          </div>
          
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#d1e6d9] py-4 pr-2">
            <p className="text-[#50956c] text-sm font-normal leading-normal">Color</p>
            <p className="text-[#0e1b13] text-sm font-normal leading-normal">{color}</p>
          </div>
        </div>

        {/* Checkboxes for packaging and manual */}
        <div className="px-4">
          <label className="flex gap-x-3 py-3 flex-row">
            <input
              type="checkbox"
              checked={original_packaging}
              readOnly
              className="h-5 w-5 rounded border-[#d1e6d9] border-2 bg-transparent text-[#1dc962] checked:bg-[#1dc962] checked:border-[#1dc962] focus:ring-0 focus:ring-offset-0 focus:border-[#d1e6d9] focus:outline-none"
            />
            <p className="text-[#0e1b13] text-base font-normal leading-normal">Original Packaging</p>
          </label>
          
          <label className="flex gap-x-3 py-3 flex-row">
            <input
              type="checkbox"
              checked={manual_included}
              readOnly
              className="h-5 w-5 rounded border-[#d1e6d9] border-2 bg-transparent text-[#1dc962] checked:bg-[#1dc962] checked:border-[#1dc962] focus:ring-0 focus:ring-offset-0 focus:border-[#d1e6d9] focus:outline-none"
            />
            <p className="text-[#0e1b13] text-base font-normal leading-normal">Manual</p>
          </label>
        </div>

        {/* Working Condition */}
        {working_condition_desc && (
          <>
            <h3 className="text-[#0e1b13] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Working Condition
            </h3>
            <p className="text-[#0e1b13] text-base font-normal leading-normal pb-3 pt-1 px-4">
              {working_condition_desc}
            </p>
          </>
        )}

        {/* Location */}
        <h3 className="text-[#0e1b13] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Location
        </h3>
        
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 text-[#0e1b13] text-sm">
            <MapPin size={16} className="text-[#50956c]" />
            <span>
              {[city, state, country].filter(Boolean).join(', ')}
              {postal_code && ` ${postal_code}`}
            </span>
          </div>
          {username && (
            <div className="flex items-center gap-2 text-[#0e1b13] text-sm mt-2">
              <User size={16} className="text-[#50956c]" />
              <span>Listed by {username}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 text-[#0e1b13] text-sm mt-1">
              <span className="text-[#50956c]">Phone:</span>
              <span>{phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Contact Button */}
      <div className="px-4 py-3">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#1dc962] text-[#0e1b13] text-base font-bold leading-normal tracking-[0.015em] w-full hover:bg-[#16b851] transition-colors">
          <span className="truncate">Contact / Request</span>
        </button>
      </div>

      {/* Navigation Footer */}
 
    </div>
  );
};

// Demo with your provided data
