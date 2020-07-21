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
import moment from 'moment'
import API from "../util/API"

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
  const [notes, setNotes] = useState([]);
  const [months, setMonths] = useState({});
  const [years, setYears] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };


  useEffect(() => {
    API.getFeeling(user).then((res) => {
      setNotes(res.data);
      checkYears(res.data);
      // checkMonths(res.data);
    })
  }, [])

  // I have hard-coded this for 3 years back. We need to figure out a way to make it more dynamic in creating key value pairs based off of the users history (aka, no users will have 3 years of data starting off, eventually they will have more, etc) I couldn't figure it out, the best I got was passing arrays in and hard accessing their indexes to create a set number of pairs - TM
  const attachYearToMonths = (years, monthsInYear) => {
    setMonths({
      ...months,  //take existing key-value pairs and use them in the new state,
      [years[0]]: [monthsInYear[0]], // These create new key value pairs of years with info: months that have info for that year
      [years[1]]: [monthsInYear[1]],
      [years[2]]: [monthsInYear[2]] 
    })
  } 

  // Gets all of the years that exist for the user's notes, formats the data and sets the states
  async function checkYears(data) {
    let results = []
    let sortedYears = []
    let sortedData = data

    sortedData.sort(function(a, b) {
      return parseInt(a.createdAt.slice(0,4)) - parseInt(b.createdAt.slice(0,4));
    });

    for(let i=0;i<sortedData.length;i++) {
      if (!sortedYears.includes(parseInt(sortedData[i].createdAt.slice(0,4)))) {

        // Add the unique years to the years state
        sortedYears.push(parseInt(sortedData[i].createdAt.slice(0,4)));
        
        // Gets all months that have active notes for the selected year
        let result = await checkMonths(sortedYears[sortedYears.length - 1], data)

        results.push(result)
      }
    }
    // Creates the months state by doing: year: [months] with the users historical data
    attachYearToMonths(sortedYears, results)
    setYears(sortedYears)
    // Figure out how to receive this on the server side for api call
    API.getBySpecificMonth({month: "May"}).then((res) => console.log(res));
  }

  // Gets a list of all of the months that have notes saved, sorted by number then converted to name using moment formatting.
  function checkMonths(year, data) {
    let sortedMonths = []
    let sortedDataByYear = data
    let readyToFormat = []
    let finalData = []

    // If the years match for the entry, push into the sorted months
    for (let i=0;i<sortedDataByYear.length;i++) {
      if (sortedDataByYear[i].createdAt.slice(0,4).includes(year)) {
          sortedMonths.push(parseInt(sortedDataByYear[i].createdAt.slice(5,7)))
      }
    }
    
    // Sort the remaining data by month, months are already in number format for easy sorting
    sortedMonths.sort(function(a, b) {
      return a - b;
    })
   
    // Remove duplicates
    for (let j=0;j<sortedMonths.length;j++) {
      if (sortedMonths[j] !== sortedMonths[j+1]) {
        readyToFormat.push(sortedMonths[j])
      }
    }
    
    // Formatting data for final sendoff
    for (let c=0;c<readyToFormat.length;c++) {
      finalData.push(moment(readyToFormat[c], "M").format("MMMM"))
    }

    return finalData
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
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {years.map((year) => {
        return <ListItem className={classes.btn} button onClick={handleClick}>
            <ListItemText className={classes.list} primary={year} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
      })}

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* here */}
        </List>
      </Collapse>
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