// Player_Student.js 
// Computer Science 3200 - Assignment 3
// Author(s): David Churchill [replace with your name(s)]
//
// All of your Assignment code should be in this file, it is the only file submitted.
// You may create additional functions / member variables within this class, but do not
// rename any of the existing variables or function names, since they are used by the
// GUI to perform specific functions.

Player_Student = function (config) {
    var self = {};
    self.config = config;
    self.searchStartTime = 0;
    self.maxD = 5;

    self.bestAction = -1;
    // Student TODO:
    // You WILL need extra member variables here in order to implement IDAB properly
    // For example, you will need to store:
    //     - The maximum depth of the current iteration of IDAB search
    //     - The best action found so far for the current iteration of IDAB search 
    //     - The best action found so far for the previous COMPLETED depth of IDAB search

    // Function which is called by the GUI to get the action
    self.getAction = function (state) {

        return self.IDAlphaBeta(state);
    }

    // Student TODO: Implement this function
    //
    // This funtion should compute a heuristic evaluation of a given state for a given player.
    // It should return a large positive value for a 'good' state for the player, and a large
    // negative value for a 'bad' state for the player. Assign the maximum possible values to
    // winning and losing states, and be sure to assign values in between for states of a game
    // in progress. 
    //
    // This is one of the most important factors in your program performing well in the
    // class competition - poor heursitic functions cannot always be saved by good search.
    //
    // Args:
    //    state        : the state to evaluate
    //    player       : the player to evaluate the state for
    //
    // Returns:
    //    value (int)  : the heuristic evaluation of the state
    //
    self.eval = function (state, player) {

        var winner = state.winner();
        if (winner == player) {
            return 10000;
        } else if (winner == PLAYER_NONE) {

            var acc = 0;
            for (let x = 0; x < state.width; x++) {
                for (let y = 0; y < state.height; y++) {
                    acc += state.get(x, y) == 2 ? 0 :
                        self.computeScore(x, y) * state.get(x, y) == player ? 1 : -1;
                    // : (-1) * self.computeScore(x, y);
                }
            }

            return acc;
        } else if (winner == PLAYER_DRAW) {
            return 0;
        } else {
            return -10000;
        }
    }

    self.computeScore = function (x, y) {

        w = 7
        h = 6

        truncate = function (x) {
            return x > 3 ? 3 : x;
        }

        n_groups_of_4 = function (x) {
            return x < 4 ? 0 : x - 3;
        }

        left_ = truncate(x);
        right_ = truncate(Math.abs(w - x) - 1);
        top_ = truncate(Math.abs(h - y) - 1);
        bttm_ = truncate(y);


        nw = n_groups_of_4(Math.min(left_, top_) + Math.min(right_, bttm_) + 1);
        ne = n_groups_of_4(Math.min(right_, top_) + Math.min(left_, bttm_) + 1);
        hrzntl = n_groups_of_4(right_ + left_ + 1);
        vrtcl = n_groups_of_4(top_ + bttm_ + 1);

        return nw + ne + hrzntl + vrtcl;

    }

    // Student TODO: Implement this function
    //
    // This funtion should implement Iterative Deepening Alpha Beta (IDAB). It should call the
    // separate AlphaBeta function which implements the MiniMax search with Alpha Beta pruning.
    // This function should use the self.config configuration options for the following:
    // 
    //     config.timeLimit - search time limit in milliseconds
    //                      - timeLimit of 0 means there is no time limit
    //     config.maxDepth  - maximum depth for IDAB  (depth > maxDepth) = eval()
    //                      - maxDepth of 0 means no max depth
    //
    //     You can assume one of timeLimit or maxDepth will always be greater than 0
    //
    // Please note that both of these limits should be used, and whichever one happens first
    // should be the stopping condition.
    //
    // Be sure to return the best action from the last COMPLETED AlphaBeta search.
    //
    // Args:
    //    state        : the state for which to find the best action for the player to move
    //
    // Returns:
    //    action (int) : the best action for the player to move
    //
    self.IDAlphaBeta = function (state) {

        var maxAction = -1;
        depth = self.maxD;
        var bestAction = self.AlphaBeta(state, -1000000, 1000000, depth, true)[1];


        // here is the syntax to record the time in javascript
        self.searchStartTime = performance.now();

        // return the best action found

        return bestAction;
    }

    // Student TODO: Implement this function
    //
    // This funtion should implement MiniMax with Alpha-Beta Pruning. It is recommended
    // to first get vanilla MiniMax search working properly before implementing the Alpha
    // Beta pruning enhancement. 
    //
    // Please be aware that this function does not return an action - it returns a state value.
    // Actions must be set to a self variable, rather than returned. 
    //
    // It is important that you COPY states [via state.copy()] before generating children,
    // otherwise you will be modifying reference to states on different levels of recursion.
    // (Disregard this if you have implemented an action-undo functionality)
    //
    // Args:
    //    state        : the state for the current node in the search tree
    //    alpha (int)  : the current alpha value of the search
    //    beta  (int)  : the current beta value of the search
    //    depth (int)  : the current depth of the search
    //    max (bool)   : whether the current player is maximizing or not
    //
    // Returns:
    //    value (int)  : the value of the state
    //
    self.AlphaBeta = function (state, alpha, beta, d, max) {
        // 



        if (d == 0) {




            // 
            // 
            // 

            return [(max ? -1 : 1) * self.eval(state, state.player == 1 ? 0 : 1), null];
        }

        // code for AlphaBeta goes here
        var actions = state.getLegalActions();
        var bestAction = null;
        if (actions.length == 1) {
            bestAction = actions[0];
        }

        if (max) {

            let value = -10000;
            for (let a = 0; a < actions.length; a++) {
                
                

                

                let c = state.copy();
                c.doAction(actions[a]);

                value = Math.max(value, self.AlphaBeta(c, alpha, beta, d - 1, !max)[0]);
                if (c.board[3][3] == 0) {
                    
                    
                    // 
                    
                    // 
                }
                if (value > alpha) {
                    alpha = value;
                    if (d == self.maxD) {
                        bestAction = actions[a];
                    }
                }
                if (alpha >= beta) {
                    break;
                }
                
                // if (d == self.maxD) {
                //     break;
                // }
            }


            return [value, bestAction];

        } else if (!max) {

            let value = 10000;
            for (let a = 0; a < actions.length; a++) {


                let c = state.copy();
                c.doAction(actions[a]);
                value = Math.min(value, self.AlphaBeta(c, alpha, beta, d - 1, max)[0]);
                // 
                if (c.board[3][3] == 0) {
                    
                    
                    // 
                    
                    // 
                }

                beta = Math.min(beta, value);

                if (alpha >= beta) {
                    break;
                }
            }

            return [value, bestAction];
        }


        // here is the syntax to calculate how much time has elapsed since the search began
        // you should compare this to self.config.

        // return the value

    }



    return self;
}