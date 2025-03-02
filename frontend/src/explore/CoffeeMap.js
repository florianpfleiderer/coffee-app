import React from 'react';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import $ from 'jquery';

function CoffeeMap() {
  const [selectedRegion, setSelectedRegion] = React.useState(null);

  const coffeeRegions = {
    ET: {  // Ethiopia
      name: "Ethiopia",
      details: {
        varieties: ["Arabica"],
        notes: "Birthplace of coffee, known for floral and fruity notes",
        altitude: "1,500-2,200m"
      }
    },
    CO: {  // Colombia
      name: "Colombia",
      details: {
        varieties: ["Arabica"],
        notes: "Well-balanced with caramel sweetness",
        altitude: "1,200-2,000m"
      }
    },
    BR: {  // Brazil
      name: "Brazil",
      details: {
        varieties: ["Arabica", "Robusta"],
        notes: "Nutty, chocolate notes, low acidity",
        altitude: "800-1,600m"
      }
    },
    VN: {  // Vietnam
      name: "Vietnam",
      details: {
        varieties: ["Robusta"],
        notes: "Strong and bold, perfect for espresso blends",
        altitude: "600-800m"
      }
    },
    GT: {  // Guatemala
      name: "Guatemala",
      details: {
        varieties: ["Arabica"],
        notes: "Complex, spicy, with chocolate undertones",
        altitude: "1,300-2,000m"
      }
    },
    CR: {  // Costa Rica
      name: "Costa Rica",
      details: {
        varieties: ["Arabica"],
        notes: "Bright, clean, with citrus undertones",
        altitude: "1,200-1,800m"
      }
    },
    KE: {  // Kenya
      name: "Kenya",
      details: {
        varieties: ["Arabica"],
        notes: "Wine-like acidity, full body, berry notes",
        altitude: "1,400-2,000m"
      }
    },
    ID: {  // Indonesia
      name: "Indonesia",
      details: {
        varieties: ["Arabica", "Robusta"],
        notes: "Full-bodied, earthy, low acidity",
        altitude: "1,000-1,500m"
      }
    }
  };

  const handleRegionClick = (e, code) => {
    if (coffeeRegions[code]) {
      setSelectedRegion(code);
    } else {
      setSelectedRegion(null);
    }
  };

  const mapData = {};
  Object.keys(coffeeRegions).forEach(code => {
    mapData[code] = 1;
  });

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <VectorMap
          map={worldMill}
          backgroundColor="transparent"
          zoomOnScroll={true}
          containerStyle={{
            width: '100%',
            height: '600px',
            minWidth: '800px'
          }}
          onRegionClick={handleRegionClick}
          regionStyle={{
            initial: {
              fill: '#e4e4e4',
              fillOpacity: 0.9,
              stroke: '#ffffff',
              strokeWidth: 1,
              strokeOpacity: 1
            },
            hover: {
              fillOpacity: 0.8,
              cursor: 'pointer'
            }
          }}
          regionLabelStyle={{
            initial: {
              fontFamily: 'Verdana',
              fontSize: '12',
              fill: 'black'
            },
            hover: {
              fill: 'black'
            }
          }}
          labels={{
            regions: {
              render: (code) => {
                return coffeeRegions[code] ? coffeeRegions[code].name : '';
              }
            }
          }}
          series={{
            regions: [{
              attribute: 'fill',
              scale: {
                '1': '#3498db'
              },
              values: mapData
            }]
          }}
        />
      </div>
      
      {selectedRegion && coffeeRegions[selectedRegion] && (
        <div className="region-details">
          <h3>{coffeeRegions[selectedRegion].name}</h3>
          <div className="region-info">
            <p><strong>Varieties:</strong> {coffeeRegions[selectedRegion].details.varieties.join(", ")}</p>
            <p><strong>Flavor Notes:</strong> {coffeeRegions[selectedRegion].details.notes}</p>
            <p><strong>Growing Altitude:</strong> {coffeeRegions[selectedRegion].details.altitude}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoffeeMap; 