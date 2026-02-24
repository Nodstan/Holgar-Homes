export interface Property {
  id: number;
  tag: string;
  tag2?: string;
  price: string;
  priceNumeric: number;
  location: string;
  title: string;
  desc: string;
  beds: number;
  baths: number;
  image: string;
  type: string;
}

export const MOCK_PROPERTIES: Property[] = [
  { 
    id: 1, 
    tag: 'FOR SALE', 
    tag2: 'NEW', 
    price: '₦150M', 
    priceNumeric: 150, 
    location: 'Lekki Phase 1, Lagos', 
    title: 'Modern 5-Bedroom Duplex', 
    desc: 'An architectural masterpiece featuring smart home automation, a private cinema, and a rooftop terrace with stunning skyline views.', 
    beds: 5, 
    baths: 6, 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 
    type: 'Duplex' 
  },
  { 
    id: 2, 
    tag: 'PREMIUM', 
    price: '₦450M', 
    priceNumeric: 450, 
    location: 'Old Ikoyi, Lagos', 
    title: 'Executive Penthouse Suite', 
    desc: 'Experience unparalleled luxury in this sprawling penthouse. Features include floor-to-ceiling windows, private elevator access, and a wrap-around balcony.', 
    beds: 4, 
    baths: 5, 
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', 
    type: 'Penthouse' 
  },
  { 
    id: 4, 
    tag: 'FOR SALE', 
    price: '₦80M', 
    priceNumeric: 80, 
    location: 'Ajah, Lagos', 
    title: 'Luxury 3-Bedroom Apartment', 
    desc: 'A perfect blend of comfort and style. This apartment features high ceilings, premium tile flooring, and 24/7 security in a quiet neighborhood.', 
    beds: 3, 
    baths: 3, 
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', 
    type: 'Apartment' 
  },
  { 
    id: 5, 
    tag: 'NEW', 
    price: '₦200M', 
    priceNumeric: 200, 
    location: 'Ikeja GRA, Lagos', 
    title: 'Grade-A Commercial Office', 
    desc: 'Strategically located corporate headquarters with open-plan layouts, high-speed fiber optics, and dedicated parking for over 10 vehicles.', 
    beds: 0, 
    baths: 2, 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c', 
    type: 'Commercial' 
  },
  { 
    id: 6, 
    tag: 'FOR SALE', 
    price: '₦350M', 
    priceNumeric: 350, 
    location: 'Asokoro, Abuja', 
    title: 'Royal 7-Bedroom Mansion', 
    desc: 'A palatial residence situated in the diplomatic zone. Boasts an olympic-sized pool, guest chalets, and a bulletproof safe room.', 
    beds: 7, 
    baths: 8, 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', 
    type: 'Mansion' 
  },
  { 
    id: 7, 
    tag: 'FOR SALE', 
    price: '₦60M', 
    priceNumeric: 60, 
    location: 'Surulere, Lagos', 
    title: 'Classic 3-Bedroom Bungalow', 
    desc: 'Spacious family home with a large backyard. Renovated with modern bathrooms and a newly paved driveway in a central location.', 
    beds: 3, 
    baths: 2, 
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', 
    type: 'Bungalow' 
  },
  { 
    id: 8, 
    tag: 'FOR SALE', 
    price: '₦180M', 
    priceNumeric: 180, 
    location: 'Gwarimpa, Abuja', 
    title: 'Premium Semi-Detached Home', 
    desc: 'Exquisite finishing with Italian marble floors, spacious bedrooms, and a fully fitted kitchen including a washing machine and dryer.', 
    beds: 4, 
    baths: 4, 
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994', 
    type: 'Duplex' 
  },
  { 
    id: 9, 
    tag: 'PREMIUM', 
    price: '₦900M', 
    priceNumeric: 900, 
    location: 'Banana Island, Lagos', 
    title: 'Ultra-Luxury Waterfront Estate', 
    desc: 'One of Nigeria\'s most exclusive addresses. Includes a private jetty, infinity pool, and a master suite that occupies an entire floor.', 
    beds: 6, 
    baths: 7, 
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811', 
    type: 'Mansion' 
  },
  { 
    id: 10, 
    tag: 'FOR SALE', 
    price: '₦45M', 
    priceNumeric: 45, 
    location: 'Ibeju Lekki, Lagos', 
    title: 'Prime Residential Land', 
    desc: 'Strategic plot located near the Lekki Free Trade Zone. Ready for immediate development with Governor\'s Consent title.', 
    beds: 0, 
    baths: 0, 
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef', 
    type: 'Land' 
  },
  { 
    id: 11, 
    tag: 'FOR SALE', 
    price: '₦110M', 
    priceNumeric: 110, 
    location: 'Wuse 2, Abuja', 
    title: 'Modern 1-Bedroom Studio', 
    desc: 'Perfect for young professionals or investors. High rental yield potential in the heart of Abuja\'s business district.', 
    beds: 1, 
    baths: 1, 
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 
    type: 'Apartment' 
  },
  { 
    id: 3, 
    tag: 'FOR SALE', 
    price: '₦120M', 
    priceNumeric: 120, 
    location: 'Maitama, Abuja', 
    title: 'Contemporary 4-Bedroom Terrace', 
    desc: 'Nestled in a secure gated community, this terrace offers sleek finishes, a gourmet kitchen, and beautifully landscaped outdoor spaces.', 
    beds: 4, 
    baths: 4, 
    image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e', 
    type: 'Terrace' 
  },
  { 
    id: 12, 
    tag: 'FOR SALE', 
    price: '₦220M', 
    priceNumeric: 220, 
    location: 'Osapa London, Lagos', 
    title: 'Smart 5-Bedroom Duplex', 
    desc: 'Equipped with voice-controlled lighting, climate control, and a state-of-the-art security system. The ultimate modern living experience.', 
    beds: 5, 
    baths: 5, 
    image: 'https://images.unsplash.com/photo-1580587767303-9cd702c89736', 
    type: 'Duplex' 
  },
];