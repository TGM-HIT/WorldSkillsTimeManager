# Information regarding the configuration of the timetable
## Tournament Days
In order for our timetable to work, you need to define all tournament days which you have set in the Timeslot Object. For example, if you have defined that a timeslot has the Day "C1", you would need to define this "C1" inside of the file called "configTable.json". An example would be:

```json
[
     {
        "tournamentDayName":"C1",
        "dateFormat":"2025-04-09"
    },
    {
        "tournamentDayName":"C2",
        "dateFormat":"2025-04-12"
    },
    // more entries...
]
```

Please expand the list as you see fit. Please make sure to use the date format "YYYY-MM-DD", as otherwise the timetable would break. If you haven't set all tournament day names, an error will appear in your timetable.

## Calendar Options
