import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import moment from "moment";
import API from "../util/API";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  accordion: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  summary: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  details: {
    padding: theme.spacing(2),
  },
  expanded: {},
  list: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    width: "110%",
    // flexDirection: "column",
  },
}));

function SavedNotes({
  savedNotes,
  setTitle,
  setNote,
  setEmotions,
  setNewBtn,
  updateBtn,
  user,
}) {
  const [allNotes, setAllNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [months, setMonths] = useState({});
  const [years, setYears] = useState([]);
  const [openYear, setOpenYear] = React.useState(null);
  const [openMonth, setOpenMonth] = React.useState(false);
  const [currentOpenMonth, setCurrentOpenMonth] = useState(null)
  const classes = useStyles();

  const handleClickYear = (panel) => (event, newExpanded) => {
    setOpenYear(newExpanded ? panel : false);
    setOpenMonth(false)
    setCurrentOpenMonth(false)
  };

  const handleClickMonth = (event, year, month) => {
    handleNotesByMonth(year, month);
  };

  // Initializes the saved notes to the side of the page
  useEffect(() => {
    API.getFeeling(user).then((res) => {
      setAllNotes(res.data);
      checkYears(res.data);
    });
  }, [savedNotes]);

  useEffect(() => {
    console.log(years, months);
  }, [years, months]);

  // I have hard-coded this for 3 years back. We need to figure out a way to make it more dynamic in creating key value pairs based off of the users history (aka, no users will have 3 years of data starting off, eventually they will have more, etc) I couldn't figure it out, the best I got was passing arrays in and hard accessing their indexes to create a set number of pairs - TM
  const attachYearToMonths = (years, monthsInYear) => {
    setMonths({
      ...months, //take existing key-value pairs and use them in the new state,
      [years[0]]: [monthsInYear[0]], // These create new key value pairs of years with info: months that have info for that year
      [years[1]]: [monthsInYear[1]],
      [years[2]]: [monthsInYear[2]],
    });
  };

  // Gets all of the years that exist for the user's notes, formats the data and sets the states
  async function checkYears(data) {
    let results = [];
    let sortedYears = [];
    let sortedData = data;

    sortedData.sort(function (a, b) {
      return (
        parseInt(a.createdAt.slice(0, 4)) - parseInt(b.createdAt.slice(0, 4))
      );
    });

    for (let i = 0; i < sortedData.length; i++) {
      if (
        !sortedYears.includes(parseInt(sortedData[i].createdAt.slice(0, 4)))
      ) {
        // Add the unique years to the years state
        sortedYears.push(parseInt(sortedData[i].createdAt.slice(0, 4)));

        // Gets all months that have active notes for the selected year
        let result = await checkMonths(
          sortedYears[sortedYears.length - 1],
          data
        );

        results.push(result);
      }
    }
    // Creates the months state by doing: year: [months] with the users historical data
    attachYearToMonths(sortedYears, results);
    setYears(sortedYears);
  }

  const handleNotesByMonth = (year, month) => {
    console.log(year, month);
    API.getBySpecificMonth({
      year: year,
      month: month,
      user: user
    }).then((res) => {
      console.log(res.data);
      setFilteredNotes(res.data);
      // If the current open month is the clicked month, close the accordion, else if it is not, open the selected month's accordion
      setOpenMonth(currentOpenMonth === month ? false : month ? month : false);
      // Sets the current open month to the clicked month, if the clicked month equals itself, return false to impact the above statement
      setCurrentOpenMonth(currentOpenMonth === month ? false : month);
    });
  };

  // Gets a list of all of the months that have notes saved, sorted by number then converted to name using moment formatting.
  function checkMonths(year, data) {
    let sortedMonths = [];
    let sortedDataByYear = data;
    let readyToFormat = [];
    let finalData = [];

    // If the years match, push into the sorted months
    for (let i = 0; i < sortedDataByYear.length; i++) {
      if (sortedDataByYear[i].createdAt.slice(0, 4).includes(year)) {
        sortedMonths.push(parseInt(sortedDataByYear[i].createdAt.slice(5, 7)));
      }
    }

    // Sort the remaining data by month, months are already in number format for easy sorting
    sortedMonths.sort(function (a, b) {
      return a - b;
    });

    // Remove duplicates
    for (let j = 0; j < sortedMonths.length; j++) {
      if (sortedMonths[j] !== sortedMonths[j + 1]) {
        readyToFormat.push(sortedMonths[j]);
      }
    }

    // Formatting data for final sendoff
    for (let c = 0; c < readyToFormat.length; c++) {
      finalData.push(moment(readyToFormat[c], "M").format("MMMM"));
    }

    return finalData;
  }

  const showFeelings = (id) => {
    console.log("i was click");
    let selectedFeeling = savedNotes.filter((note) => note.id === id)[0];
    console.log(selectedFeeling);
    setNote(selectedFeeling.notes);
    setTitle(selectedFeeling.title);
    setEmotions(selectedFeeling.emotion);
    if (setNewBtn) {
      setNewBtn(false);
    } else {
      updateBtn();
    }
  };

  console.log(user);
  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {years.map((year) => {
        return (
          <Accordion
            square
            TransitionProps={{ unmountOnExit: true }}
            expanded={openYear === year}
            onChange={handleClickYear(year)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{year}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ root: { flexDirection: "column" } }}>
              {months[year][0].map((month) => {
                return (
                  <Accordion
                    square
                    TransitionProps={{ unmountOnExit: true }}
                    expanded={openMonth === month}
                    onChange={(e) => handleClickMonth(e, year, month)}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>{month}</Typography>
                    </AccordionSummary>
                    {filteredNotes.length &&
                      filteredNotes
                        .filter((note) => note.user === user)
                        .map((note) => {
                          return (
                            <AccordionDetails>
                              <Typography
                                button
                                key={note.id}
                                onClick={() => showFeelings(note.id)}
                              >
                                <Button>{note.title}</Button>
                              </Typography>
                            </AccordionDetails>
                          );
                        })}
                  </Accordion>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </List>
  );
}

export default SavedNotes;
