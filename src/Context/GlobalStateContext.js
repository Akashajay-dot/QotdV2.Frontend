// import React, { createContext, useState, useReducer } from "react";

// const GlobalStateContext = createContext();
// const GlobalStateProvider = ({ children }) => {
//   const [state, setState] = useState({
//     isLogedin: false,
//     id: "",
//     pic: "",
//     name: "",
//     isAnswered: false,
//     categories: [],
//     UserName: "",
//     loading: false,
//     isAdmin: false,
//     QId: "",
//     rank: "",
//     totaluser: "",
//     toggle: false,
//     dates: [],
//     email: "",
//     expiresAt: null,
//   });
//   const setEmail = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       email: i,
//     }));
//   };
//   const setDates = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       dates: i,
//     }));
//   };
//   const setExpiresAt = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       expiresAt: i,
//     }));
//   };
//   const setToggle = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       toggle: i,
//     }));
//   };
//   const setRank = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       rank: i,
//     }));
//   };
//   const setTotaluser = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       totaluser: i,
//     }));
//   };

//   const setLogedin = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       isLogedin: i,
//     }));
//   };
//   const setQId = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       QId: i,
//     }));
//   };
//   const setId = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       id: i,
//     }));
//   };
//   const setisAnswered = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       isAnswered: i,
//     }));
//   };
//   const setCategory = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       categories: i,
//     }));
//   };
//   const setUserName = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       UserName: i,
//     }));
//   };

//   const setLoading = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       loading: i,
//     }));
//   };
//   const setAdmin = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       isAdmin: i,
//     }));
//   };
//   const setPic = (i) => {
//     setState((prevState) => ({
//       ...prevState,
//       pic: i,
//     }));
//   };

//   return (
//     <GlobalStateContext.Provider
//       value={{
//         state,
//         setExpiresAt,
//         setDates,
//         setEmail,
//         setLogedin,
//         setId,
//         setToggle,
//         setisAnswered,
//         setCategory,
//         setUserName,
//         setLoading,
//         setAdmin,
//         setPic,
//         setQId,
//         setTotaluser,
//         setRank,
//       }}
//     >
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// export { GlobalStateContext, GlobalStateProvider };
import React, { createContext, useState } from "react";

const GlobalStateContext = createContext();

const initialState = {
  isLogedin: false,
  id: "",
  pic: "",
  name: "",
  isAnswered: false,
  categories: [],
  UserName: "",
  loading: false,
  isAdmin: false,
  QId: "",
  rank: "",
  totaluser: "",
  toggle: false,
  dates: [],
  email: "",
  expiresAt: null,
  prevQid:"",
};

const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const resetState = () => {
    setState(initialState);
  };

  const setEmail = (i) => {
    setState((prevState) => ({
      ...prevState,
      email: i,
    }));
  };
  const setprevQid = (i) => {
    setState((prevState) => ({
      ...prevState,
      prevQid: i,
    }));
  };

  const setDates = (i) => {
    setState((prevState) => ({
      ...prevState,
      dates: i,
    }));
  };

  const setExpiresAt = (i) => {
    setState((prevState) => ({
      ...prevState,
      expiresAt: i,
    }));
  };

  const setToggle = (i) => {
    setState((prevState) => ({
      ...prevState,
      toggle: i,
    }));
  };

  const setRank = (i) => {
    setState((prevState) => ({
      ...prevState,
      rank: i,
    }));
  };

  const setTotaluser = (i) => {
    setState((prevState) => ({
      ...prevState,
      totaluser: i,
    }));
  };

  const setLogedin = (i) => {
    setState((prevState) => ({
      ...prevState,
      isLogedin: i,
    }));
  };

  const setQId = (i) => {
    setState((prevState) => ({
      ...prevState,
      QId: i,
    }));
  };

  const setId = (i) => {
    setState((prevState) => ({
      ...prevState,
      id: i,
    }));
  };

  const setisAnswered = (i) => {
    setState((prevState) => ({
      ...prevState,
      isAnswered: i,
    }));
  };

  const setCategory = (i) => {
    setState((prevState) => ({
      ...prevState,
      categories: i,
    }));
  };

  const setUserName = (i) => {
    setState((prevState) => ({
      ...prevState,
      UserName: i,
    }));
  };

  const setLoading = (i) => {
    setState((prevState) => ({
      ...prevState,
      loading: i,
    }));
  };

  const setAdmin = (i) => {
    setState((prevState) => ({
      ...prevState,
      isAdmin: i,
    }));
  };

  const setPic = (i) => {
    setState((prevState) => ({
      ...prevState,
      pic: i,
    }));
  };

  return (
    <GlobalStateContext.Provider
      value={{
        state,
        setExpiresAt,
        setDates,
        setEmail,
        setLogedin,
        setId,
        setToggle,
        setisAnswered,
        setCategory,
        setUserName,
        setLoading,
        setAdmin,
        setPic,
        setQId,
        setTotaluser,
        setRank,
        resetState,
        setprevQid,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };