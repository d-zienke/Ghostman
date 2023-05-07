# Ghostman Game project
Implemented using `HTML`, `JavaScript`, `React 18`, `SCSS` and `Supabase`

Compiled with `Vite`

## Short description
This is a simple variation of the classic word game Hangman, where player needs to guess a randomly generated word, one letter at a time.

Each letter is masked, displayed as an underscore ( `_` ). When the player has guessed a letter, every instance of this letter is uncovered. To win the game, player needs to uncover all letters before they run out of chances.

## Before you run the code:
The game fetches new words from a table created on **Supabase**. If you want to use this code for your own project, you can either connect it to another 3rd party API that returns random words (e.g. `Wordnik API`), or:

1. create your own Supabase project and create a table for the words:
```sql
create table
  public.puzzles - eng (
    id bigint generated by default as identity not null,
    created_at timestamp with time zone null default now(),
    puzzle_eng character varying null,
    constraint puzzles - eng_pkey primary key (id)
  ) tablespace pg_default;
```
2. attach the table to project by modyfying existing code in `getWord` function.
3. Create `.env` file in the source directory and write inside:
`VITE_SUPABASE_KEY=[YOUR_API_KEY]`
    * Please, make sure you have replaced `[YOUR_API_KEY]` with the actual key.

## How the code works:
The component uses several `useState` hooks to manage its state, including: 
* `game` to track whether the game is on or off and its current status, 
* `word` to store the word to guess, 
* `guessedLetters` to keep track of the letters that the user has guessed so far, 
* `chances` to track the number of remaining chances the user has, and 
* `statusMsg` to display status messages to the user.

The component defines several functions to handle user input and update the state accordingly.
The `Ghostman` component returns a main container that contains two sections. The first section contains a `GameStatus` component that displays the current status of the game and a `GameOff` or `GameOn` component depending on whether the game is on or off.

## Features to implement and new ideas
* mark buttons that were used but did not match (toggle modifier class "--wrong")
* use computer keyboard to guess the letters
* add another language and allow switching between them before the game starts

## Version history
* 1.0.2
  * Minor styling adjustements were made
* 1.0.1
  * Fixed bug on smaller devices (height around 545px): the button was too close to keyboard

## Images used in the project
* [ghost_game-off](https://www.freepik.com/free-vector/cute-ghost-brings-axis_32304191.htm#query=ghost&position=4&from_view=author) by **andhndstd** on Freepik
* [ghost_game-on](https://www.freepik.com/free-vector/cute-ghost-full-love_32304213.htm#query=ghost&position=20&from_view=author) by **andhndstd** on Freepik
* [ghost_game-over](https://www.freepik.com/free-vector/cute-ghost-full-pressure_32304225.htm#page=3&query=death&position=19&from_view=search&track=sph) by **andhndstd** on Freepik
* [ghost_game-won](https://www.freepik.com/free-vector/happy-cute-ghost_32304248.htm#page=3&query=death&position=18&from_view=search&track=sph) by **andhndstd** on Freepik
* [hangman-icon](https://www.iconfinder.com/quizanswers) by **Vlad Marin** on Iconfinder
* [heart-icon](https://www.iconfinder.com/korawan_m) by **BomSymbols** on Iconfinder
