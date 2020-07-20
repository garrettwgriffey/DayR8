import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
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

const months = {
  first: "January",
  second: "February",
  third: "March",
  fourth: "April",
  fifth: "May",
  sixth: "June",
  seventh: "July",
  eighth: "August",
  ninth: "September",
  tenth: "October",
  eleventh: "November",
  twelfth: "December"
}

function SavedNotes({
  savedNotes,
  setTitle,
  setNote,
  setEmotions,
  setNewBtn,
  updateBtn,
  user,
}) {
  let whatToCollapse = null;
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
      checkMonths(res.data);
      console.log(res.data)
    }).then(() => {
      console.log(notes)
      notes.map((entry) => {})
    })
  }, [])

  // Gets all of the years that exist for the user's notes, formats the data and sets it to year state for use in displaying text on buttons
  const checkYears = (data) => {
    let years = []
    for(let i=0;i<data.length;i++) {
      if (data[i].createdAt.slice(0,4) !== years[years.length - 1]) {
        years.push(data[i].createdAt.slice(0,4))
      }
    }
    setYears(years)
  }

  const checkMonths = (data) => {
    let months = [];
    let len = data.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (data[j] > data[j + 1]) {
                let tmp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = tmp;
            }
        }
        return data
    }
    console.log(data)
    for (let z=0;z<data.length;z++) {
      if (data[z].createdAt.slice(5,7) === data[z+1].createdAt.slice(5,7)) {
        let garbage = data.splice[z]
      }
      else {
        months.push(moment(data[z].createdAt.slice(5,7), "MM").format("MMMM"))
      }
    }
    console.log(data)
    // for(let i=0;i<data.length;i++) {
    //   if (moment(data[i].createdAt.slice(5,7), "MM").format("MMMM") !== months[months.length - 1]) {
    //     months.push(moment(data[i].createdAt.slice(5,7), "M").format("MMMM"));
    //     console.log(months)
    //   }
    // }
    setMonths(months)
  }


  const showFeelings = (id) => {
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
      <ListItem className={classes.btn} button onClick={handleClick}>
        <ListItemText className={classes.list} primary="2020" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

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