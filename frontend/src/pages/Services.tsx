
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SERVICES } from '@/lib/constants';

const Services = () => {
  const serviceDetails = {
    "oil-gas": {
      image: "https://images.unsplash.com/photo-1745725427797-d0b3e3b7a8af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2lsJTIwYW5kJTIwZ2FzJTIwbmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D?w=800&h=600&fit=crop",
      details: "With our in-depth knowledge of the oil industry, and a total of over 4 years experience gained by the Top Management of SOUTHERN BASIN we are in a position to offer a wide range of consultancy services in the oil and gas industry. Our special focus is on Manpower Supply, Value-for-money Audit, Supply Chain and Material Management services. Pipeline Integrity Survey Repair Services Working with one of the world's largest and most experienced conglomerate companies in the Pipeline Integrity Survey and Repair Services SOUTHERN BASIN can handle these services under the most severe conditions."
    },
    "design-planning": {
      image: "https://plus.unsplash.com/premium_photo-1744428941961-e35e85b16433?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZW5naW5lZXJpbmclMjBkZXNpZ24lMjBuaWdlcmlhfGVufDB8fDB8fHww?w=800&h=600&fit=crop",
      details: "Projects are more powerful when driven by a purpose. The purpose that brings experts together with our clients is to create, enhance and sustain the world's built, natural and social environments. The scope and scale of this aspiration unites scientists, planners, architects, engineers, program, cost and construction managers. It partners us with public sector clients at every level and private sector clients in every industry. We work at every scale, from an intimate garden, to a city block, to a national infrastructure program."
    },
    "mechanical-fabrication": {
      image: "https://images.unsplash.com/photo-1701448149957-b96dbd1926ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVjaGFuaWNhbCUyMGZhYnJpY2F0aW9uJTIwZW5naW5lZXJpbmclMjBuaWdlcmlhfGVufDB8fDB8fHww?w=800&h=600&fit=crop",
      details: "SOUTHERN BASIN CONSTRUCTION offers solutions in the mechanical construction and structural upgrade and fabrication services within the petrochemical and oil and gas industries. This is in addition to our specialized solutions to Engineering Construction needs in the Civil, Mechanical and Logistics sectors of the Construction industry. This specialty we demonstrate in bulk steel storage tanks construction / rehabilitation, structural upgrade works and pipeline/flowline construction etc."
    },
    "civil-engineering": {
      image: "https://plus.unsplash.com/premium_photo-1681989494329-6641281bdf50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2l2aWwlMjBlbmdpbmVlcmluZyUyMG5pZ2VyaWF8ZW58MHx8MHx8fDA%3D?w=800&h=600&fit=crop",
      details: "Southern Basin Construction Ltd. are building and civil engineering contractors, providing environmental and civil engineering solutions. We take pride in our competitiveness and the quality of services provided to our clients making us one of the leading engineering contractors and construction engineering contractors in Nigeria and West African sub region. Southern Basin civil engineers can offer civil engineering services in construction engineering and management, specialist civil engineering, and design and build."
    },
    "marine-logistics": {
      image: "https://plus.unsplash.com/premium_photo-1661879188208-21ffbe983feb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFyaW5nJTIwbG9naXN0aWNzJTIwbmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D?w=800&h=600&fit=crop",
      details: "Southern Basin Construction Ltd. maintains a team of Partners who work with customers to provide tailor-made and cost-efficient solutions regardless of the vessel type, cargo, origin or destination. We carryout Marine Logistic and Support Services on 24/7 Basis. We are into supply of General Utility/Supply Vessels, Anchor Handling Tug Supply Vessels, Offshore Supply Vessels, House Boats, Barges, Tug Boats, Brew Boats, Emergency Rescue Vessels, Supply of Associated Marine and General Services Manpower, Offshore Catering Services, Supply of Petroleum Products, and Security Services."
    },
    "mechanical-engineering": {
      image: "https://plus.unsplash.com/premium_photo-1664299390906-25ccc786a295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVjaGFuaWNhbCUyMG5pZ2VyaWF8ZW58MHx8MHx8fDA%3D?w=800&h=600&fit=crop",
      details: "Supply and Installation of Mechanical Plant and Equipment. Fully Automatic Water Pressure Boosting Pump Sets, Water Circulating Pumps, Storage Tanks and Vessels for Water, and Fossil Fuels, Water Treatment Plants, Water Softening Plants, Sewage Treatment Plants, Reverse Osmosis Plants, Deep Well Boreholes. Whatever the oil and Gas facility, commercial, industrial, institutional, or government construction assignment and project scope, the required standard requisite staff of SOUTHERN BASIN CONSTRUCTION offer a wide range of trade backgrounds."
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
     <section className="relative py-20 bg-gradient-to-br from-secondary to-primary text-white overflow-hidden">
        {/* Background Image with constrained dimensions */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Comprehensive engineering and construction solutions tailored to meet your specific needs across multiple industries.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {SERVICES.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-20">
                <Card className="overflow-hidden border-0 shadow-2xl rounded-sm">
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                      <div className={`p-6 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        <div className={`h-1 w-20 bg-gradient-to-r ${service.color} mb-6`}></div>
                        {/* <div className="text-4xl mb-6">{service.icon}</div> */}
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                          {service.title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                          {serviceDetails[service.id as keyof typeof serviceDetails]?.details || service.description}
                        </p>
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-secondary">Key Features:</h3>
                          <ul className="space-y-2 text-gray-600">
                            {service.id === 'oil-gas' && (
                              <>
                                <li>• Pipeline Integrity Survey & Repair Services</li>
                                <li>• Manpower Supply & Value-for-money Audit</li>
                                <li>• Supply Chain & Material Management</li>
                              </>
                            )}
                            {service.id === 'design-planning' && (
                              <>
                                <li>• Architectural & Engineering Design</li>
                                <li>• Project Planning & Management</li>
                                <li>• Environmental Impact Assessment</li>
                              </>
                            )}
                            {service.id === 'mechanical-fabrication' && (
                              <>
                                <li>• Steel Storage Tanks Construction</li>
                                <li>• Structural Upgrade Works</li>
                                <li>• Pipeline/Flowline Construction</li>
                              </>
                            )}
                            {service.id === 'civil-engineering' && (
                              <>
                                <li>• Road Construction & Infrastructure</li>
                                <li>• Building Construction</li>
                                <li>• Environmental Engineering Solutions</li>
                              </>
                            )}
                            {service.id === 'marine-logistics' && (
                              <>
                                <li>• Offshore Supply Vessels</li>
                                <li>• Marine Security Services</li>
                                <li>• 24/7 Logistics Support</li>
                              </>
                            )}
                            {service.id === 'mechanical-engineering' && (
                              <>
                                <li>• Water Treatment Plants</li>
                                <li>• Mechanical Plant Installation</li>
                                <li>• Deep Well Boreholes</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                        <img
                          src={serviceDetails[service.id as keyof typeof serviceDetails]?.image}
                          alt={service.title}
                          className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
