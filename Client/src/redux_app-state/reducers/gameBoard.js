const initialState = { 
    0: "Rm: Study",
    1: "HW: Study-Hall",
    2: "Rm: Hall",
    3: "HW: Hall-Lounge",
    4: "Rm: Lounge",
    5: "HW: Study-Lib",
    6: "Nothing",
    7: "Hall: Hall-BR",
    8: "Nothing",
    9: "HW: Lounge-DR",
    10: "Rm: Library",
    11: "HW: Lib-BR",
    12: "Rm: Bill Room",
    13: "HW: BR-DR",
    14: "Rm: Dining Room",
    15: "HW: Lib-Cons",
    16: "Nothing",
    17: "HW: BR-BR",
    18: "Nothing",
    19: "HW: DR-K",
    20: "Rm: Conservatory",
    21: "HW: Cons-BR",
    22: "Rm: Ballroom",
    23: "HW: BR-K",
    24: "Rm: Kitchen"
}


const GameBoard = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state

    }

}

export default GameBoard