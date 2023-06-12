import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TimeComponent from './TimeComponent';

import { UniqueFilter } from '@/helpers/getData';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface DailyTabs {
  allBaseFilters: number[],
  showOnly: Array<number[]>,
  dateList: UniqueFilter,
  filteredEvents: number[],
  timeFilter: UniqueFilter,
  timeLabels: string[]
}

export default function DailyTabs({
  allBaseFilters,
  showOnly,
  dateList,
  filteredEvents,
  timeFilter,
  timeLabels
}: DailyTabs) {
  const [tab, setTab] = useState(0);

  const dates = Object.keys(dateList).sort();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const getEventsList = (date: string) => {
    const dayEvents = dateList[date]

    var eventsForDay = dayEvents.filter(val => !allBaseFilters.includes(val));

    if (filteredEvents.length > 0) {
      eventsForDay = eventsForDay.filter(val => filteredEvents.includes(val));
    };

    showOnly.map(array => {
      if (array.length > 0) {
        eventsForDay = eventsForDay.filter(val => array.includes(val));
      }
    })

    return eventsForDay;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange} variant='scrollable' aria-label="basic tabs example">
          {dates.map((date: string, index: number) => {
            const dateEvents = getEventsList(date);
            const eventCount = dateEvents.length;
            const dateLabel = <>{date}<br />{eventCount.toLocaleString("en-US")} events</>;

            return <Tab key={date} label={dateLabel} {...a11yProps(index)} />
          })}
        </Tabs>
      </Box>
      {dates.map((date: string, index: number) => {
        const dateEvents = getEventsList(date);

        return (
          <TabPanel key={index} value={tab} index={index}>
            {timeLabels.map(time => {
              const timeEvents = timeFilter[time];
              const events = dateEvents.filter(val => timeEvents.includes(val));
              const timeEventCount = events.length;

              if (timeEventCount > 0) {
                return (
                  <TimeComponent
                    key={time}
                    events={events}
                    time={time}
                  />
                )
              }
            })}
          </TabPanel>
        )
      })}
    </Box>
  );
}