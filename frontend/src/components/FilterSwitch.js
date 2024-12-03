import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const FilterSwitch = ({ filter, setFilter }) => (
  <div className="switchContainer">
    <FormControlLabel
      control={
        <Switch
          checked={filter === 'hardcover'}
          onChange={() => setFilter(filter === 'hardcover' ? '' : 'hardcover')}
          name="hardcoverFilter"
        />
      }
      label="Hardcover Only"
    />
  </div>
);

export default FilterSwitch;
