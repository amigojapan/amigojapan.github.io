#8 Code Katastrophies, how to maintain and run a project that is falling apart

  First of all I am using dictation to write this document so if there's something's wrong please forgive me.

This document is about several bad practices I practice often but seem to help me maintain my projects but many people complain about them so I'm going to try to explain them in as much detail as I can so that you too can maintain a project that's falling apart as-well.

##1.-one huge project file
 -TODOs at the end of the file
Forget modularisation for the meantime, I like to write my whole project in one huge file if it's possible . this has several advantages , first of all , it allows you to search the entire file using the normal search command. I also have bad memory so it is easy for me to go back two other parts of the code to copy and paste some commands that I may have forgotten already . I also like to keep a huge to-do list at the end of the file. I am very verbose when I write my to-do list especially cause I have bad memory and I can't leave my program as it is without leaving every single detail written down for when I come back .
You can always modularise later when everything is done and give the appearance that your did everything properly

##2.-must copy and paste variable names

A typo in programming means having to go back and debug something for hours of programming . and programming languages don't care if variable names or function names are misspelled, written camelcase or any kind of case . so I just write it the very  first time .  So I just write my variable name the first time and stick with it from then on. I always copy and paste the variable names and function names I absolutely avoid retyping them over and over . again you can always go back and use search and replace to fix your file the correct any typos later.
One of the reasons is because I hate using non verbose variable names .

##3.-don’t make functions, instead just copy and paste the code many times

Well I'm really do like function very much . but sometimes it's hard to think of a function that will encapsulate the behaviour of a piece of code that you're repeating over and over. So when you can think one up, just copy and paste the necessary code and change constants and other things if necessary.

##4.-make backups of the project file, don’t use version control

Well Version Control is an interesting idea I have found that it is pretty difficult to learn properly . so, instead of that , I just make several copies of my project file just in case I have to go back to something from the past .

##5.-distribute binaries needed with your project in the distribution, for all major OSes

If I ever need to run a binary file in my project I preferred to distribute it with my project and since my projects tend to be multi-platform I just include a copy for every system . even on web pages I like to keep my own version of libraries and other things that may change in the future . so I don't need to update my source code later. Future versions of binary files like say the lua interpreter are not guaranteed to be able to run my code but the one I'm currently using is.

##6.-don’t plan too much, just start coding(must be a good improvisor)

As I mentioned in my other article for me unlike other programmers , I tend to improvise a lot , I don't plan my program in every single detail. I know other people do , but I have heard of people that plan too much and never get every anything done . I do plan a little but there's a time to just start coding, if it is wrong, we'll just corrected later .

##7.-use a debugger when anything seems to not work

When there's a runtime error , don't look at the code and try to figure it out too much.  Instead use your debugger , set a breakpoint, make a whole bunch of what statement watch statements , and step through your code and see where things go wrong .
