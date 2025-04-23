import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { useState } from "react";

const geoUrl = "/tr.json"; // public klasöründeki GeoJSON dosyası

const TurkeyMap = ({ selectedCity, onSelectCity, currentLocation }) => {
  const [hoveredCity, setHoveredCity] = useState(null);

  return (

    <div className="relative">
      {hoveredCity && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-black px-3 py-1 rounded shadow text-3xl font-semibold pointer-events-none z-50">
          {hoveredCity}
        </div>
      )}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [35.5, 39], scale: 1500 }}
        width={500}
        height={400}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const cityName = geo.properties.name;
              const isCurrent = cityName === currentLocation;
              const isSelected = cityName === selectedCity;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onSelectCity(cityName)}
                  onMouseEnter={() => setHoveredCity(cityName)}
                  onMouseLeave={() => setHoveredCity(null)}
                  style={{
                    default: {
                      fill: isCurrent
                        ? "#EF4444"
                        : isSelected
                          ? "#3B82F6"
                          : "#E5E7EB",
                      stroke: "#374151",
                      outline: "none",
                    },
                    hover: {
                      fill: "#A5B4FC",
                      cursor: "pointer",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#6366F1",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>



    </div>
  );
};

export default TurkeyMap;
