import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import moment from "moment";
import API from "../util/API";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
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
  // savedNotes,
  // setTitle,
  // setNote,
  // setEmotions,
  // setNewBtn,
  // updateBtn,
  user,
}) {
  const [notes, setNotes] = useState([]);
  const [months, setMonths] = useState({});
  const [years, setYears] = useState([]);
  const classes = useStyles();
  const [openYear, setOpenYear] = React.useState(null);
  const [openMonth, setOpenMonth] = React.useState(null);

  const handleClickYear = (year) => {
    setOpenYear(year);
  };
  const handleClickMonth = (year, month) => {
    handleNotesByMonth(year, month);
    setOpenMonth(month);
  };

  useEffect(() => {
    API.getFeeling(user).then((res) => {
      setNotes(res.data);
      checkYears(res.data);
      // checkMonths(res.data);
    });
  }, []);

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

  const handleNotesByMonth = (month, year) => {
    // *** Test call *** this is how we will structure our real calls when the buttons are working, grabbing btn texts, setting them to state hooks, replaying "May", "2019" with those values for the call
    API.getBySpecificMonth({
      month: month,
      year: year,
    }).then((res) => {
      console.log(res.data);
      setNotes([{ title: "ops" }]);
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

  // const showFeelings = (id) => {
  //   let selectedFeeling = savedNotes.filter((note) => note.id === id)[0];
  //   console.log(selectedFeeling);
  //   setNote(selectedFeeling.notes);
  //   setTitle(selectedFeeling.title);
  //   setEmotions(selectedFeeling.emotion);
  //   if (setNewBtn) {
  //     setNewBtn(false);
  //   } else {
  //     updateBtn();
  //   }
  // };
  console.log(user);
  return (
    // years list open
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {years.map((year) => {
        return (
          <ListItem
            className={classes.btn}
            button
            onClick={() => handleClickYear(year)}
          >
            <ListItemText className={classes.list} primary={year} />
            {openYear === year ? (
              <>
                <ExpandLess />
                {/* months list open */}
                <List
                  component="nav"
                  // className={classes.root}
                  aria-label="mailbox folders"
                >
                  {months[year][0].map((month) => {
                    return (
                      <ListItem
                        className={classes.btn}
                        button
                        onClick={() => handleClickMonth(year, month)}
                      >
                        <ListItemText
                          className={classes.list}
                          primary={month}
                        />
                        {openMonth === month ? (
                          <>
                            <ExpandLess />
                            {/* notes list open */}
                            <List
                              component="nav"
                              // className={classes.root}
                              aria-label="mailbox folders"
                            >
                              {notes.map((note) => {
                                return (
                                  <ListItem
                                    className={classes.btn}
                                    button
                                    // onClick={() => handleClickMonth(note)} new func to retrieve the note to the page
                                  >
                                    <ListItemText
                                      className={classes.list}
                                      primary={note.title}
                                    />
                                  </ListItem>
                                );
                              })}
                              {/* notes list close */}
                            </List>
                          </>
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItem>
                    );
                  })}
                  {/* month list close */}
                </List>
              </>
            ) : (
              <ExpandMore />
            )}
          </ListItem>
        );
      })}
      {/* year list close */}
    </List>
  );
}

export default SavedNotes;
// {savedNotes
//   .filter((feeling) => feeling.user === user)
//   .map((feeling) => (
//     <ListItem
//       button
//       key={feeling.id}
//       onClick={() => showFeelings(feeling.id)}
//     >
//       <ListItemText primary={feeling.title} />
//     </ListItem>
//   ))}
