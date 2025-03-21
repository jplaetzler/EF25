import React, { useState } from 'react';

interface FilterSortPanelProps {
  filter: string;
  setFilter: (filter: string) => void;
  day: string;
  setDay: (day: string) => void;
  category: string;
  setCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortDirection: string;
  setSortDirection: (sortDirection: string) => void;
  handleSort: (column: string) => void;
  resetAll: () => void;
  days: string[];
}

const FilterSortPanel: React.FC<FilterSortPanelProps> = ({
  filter,
  setFilter,
  day,
  setDay,
  category,
  setCategory,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  handleSort,
  resetAll,
  days,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {/* Toggle Button - Icon only, very minimal */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          padding: '0',
          backgroundColor: 'transparent',
          color: 'rgba(0, 255, 128, 0.7)',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = 'rgba(0, 255, 128, 0.9)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = 'rgba(0, 255, 128, 0.7)';
        }}
        title="Filter & Sort"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 5H21M7 12H17M10 19H14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Modal-like Filter Panel Container */}
      {isExpanded && (
        <>
          {/* Backdrop for modal-like effect */}
          <div 
            onClick={() => setIsExpanded(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 50,
            }}
          />
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: '-7px', // Align with the right edge of the container
            width: '300px', // Fixed width for the panel
            border: '1px solid rgba(0, 255, 128, 0.3)',
            borderRadius: '8px',
            backgroundColor: 'rgba(7, 21, 7, 0.95)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 10px rgba(0, 255, 128, 0.2)',
            zIndex: 100,
            maxHeight: '80vh',
            overflowY: 'auto',
            animation: 'fadeIn 0.2s ease-out',
          }}>

          <div style={{ padding: '15px' }}>
            {/* Search is now moved to the main component */}

          {/* Day Filter */}
          <div style={{ margin: '10px 0' }}>
            <div>Filter by Day</div>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(0, 255, 128, 0.3)',
                color: 'white',
                boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300FF80%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.7rem top 50%',
                backgroundSize: '0.65rem auto',
                paddingRight: '1.5rem',
                borderRadius: '4px',
              }}
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div style={{ margin: '10px 0' }}>
            <div>Filter by Category</div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(0, 255, 128, 0.3)',
                color: 'white',
                boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300FF80%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.7rem top 50%',
                backgroundSize: '0.65rem auto',
                paddingRight: '1.5rem',
                borderRadius: '4px',
              }}
            >
              <option value="All">All</option>
              <option value="Headliner">Headliner</option>
              <option value="Featured Artists">Featured Artists</option>
              <option value="Supporting Artists">Supporting Artists</option>
            </select>
          </div>

          {/* Reset button - Moved up after Category filter */}
          <div style={{ margin: '15px 0' }}>
            <button
              onClick={resetAll}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'rgba(138, 43, 226, 0.5)',
                border: '1px solid rgba(138, 43, 226, 0.8)',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '4px',
                boxShadow: '0 0 5px rgba(138, 43, 226, 0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(138, 43, 226, 0.7)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(138, 43, 226, 0.5)')}
            >
              Reset All Filters
            </button>
          </div>

          {/* Sort controls */}
          <div style={{ margin: '10px 0' }}>
            <div>Sort by</div>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                width: '100%',
              }}
            >
              <button
                onClick={() => handleSort('category')}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor:
                    sortBy === 'category' ? 'rgba(138, 43, 226, 0.3)' : 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(138, 43, 226, 0.3)',
                  color: '#8A2BE2',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  textShadow: '0 0 5px rgba(138, 43, 226, 0.4)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>CATEGORY</span> {sortBy === 'category' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </button>
              <button
                onClick={() => handleSort('name')}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor:
                    sortBy === 'name' ? 'rgba(0, 255, 128, 0.3)' : 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(0, 255, 128, 0.3)',
                  color: '#00FF80',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  textShadow: '0 0 5px rgba(0, 255, 128, 0.4)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>ARTIST</span> {sortBy === 'name' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </button>
              <button
                onClick={() => handleSort('day')}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor:
                    sortBy === 'day' ? 'rgba(0, 191, 255, 0.3)' : 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(0, 191, 255, 0.3)',
                  color: '#00BFFF',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  textShadow: '0 0 5px rgba(0, 191, 255, 0.4)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>DAY</span> {sortBy === 'day' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </button>
            </div>
          </div>
        </div>
          </div>
        </>
      )}
      {/* Animation styles added to the component via style tag in ElectricForestLineup */}
    </div>
  );
};

export default FilterSortPanel;