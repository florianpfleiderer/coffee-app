import React, { useState } from 'react';

function CoffeeVarieties() {
  const varieties = [
    {
      name: 'Arabica',
      description: 'Known for sweet, complex flavor and higher acidity. Grows at high altitudes.',
      regions: ['Ethiopia', 'Colombia', 'Brazil'],
      characteristics: ['Sweet', 'Complex', 'Fruity']
    },
    {
      name: 'Robusta',
      description: 'Higher caffeine content, often used in espresso blends. More disease resistant.',
      regions: ['Vietnam', 'Indonesia', 'Africa'],
      characteristics: ['Strong', 'Bold', 'Earthy']
    },
    // Add more varieties as needed
  ];

  const [selectedVariety, setSelectedVariety] = useState(null);

  return (
    <div className="varieties-container">
      <div className="varieties-list">
        {varieties.map((variety, index) => (
          <div 
            key={index}
            className={`variety-card ${selectedVariety === index ? 'selected' : ''}`}
            onClick={() => setSelectedVariety(index)}
          >
            <h3>{variety.name}</h3>
            <p>{variety.description}</p>
            <div className="variety-details">
              <div className="regions">
                <h4>Growing Regions</h4>
                <ul>
                  {variety.regions.map((region, i) => (
                    <li key={i}>{region}</li>
                  ))}
                </ul>
              </div>
              <div className="characteristics">
                <h4>Characteristics</h4>
                <div className="tags">
                  {variety.characteristics.map((char, i) => (
                    <span key={i} className="tag">{char}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoffeeVarieties; 