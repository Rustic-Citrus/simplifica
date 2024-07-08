# Simplifica: A Lesson-Planning Assistant Application

**Author**: Harry Stuart Curtis

**First Published**: 2024-06-20

**Last Updated**: 2024-07-08

## Table of Contents

- [Simplifica: A Lesson-Planning Assistant Application](#simplifica-a-lesson-planning-assistant-application)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Context](#context)
    - [The current situation](#the-current-situation)
    - [Why teachers plan lessons](#why-teachers-plan-lessons)
    - [How teachers plan lessons](#how-teachers-plan-lessons)
    - [Which teachers this application is for and why it's not for all](#which-teachers-this-application-is-for-and-why-its-not-for-all)
    - [How the PPP framework works](#how-the-ppp-framework-works)
  - [Features](#features)
    - [What this application must be](#what-this-application-must-be)
    - [What this application should be](#what-this-application-should-be)
    - [What this application could be](#what-this-application-could-be)
    - [What this application will not be](#what-this-application-will-not-be)


## Description

Simplifica is a full-stack lesson-planning assistant application. It is designed to facilitate the creation of lesson plans for English as a foreign language (EFL) teachers who use the presentation, practice, production (PPP) framework. It achieves this through a series of prompts that focuses the educator on the goals of each phase. Finally, it produces a formatted lesson plan as a downloadable document file. Additionally, the application allows for users to view and edit their created lesson plans saved to their account.

## Context

### The current situation

In theory, every lesson must have a lesson plan. In practice, this is not always the case. On the one hand, teachers want to minimise the time spent writing lesson plans, so that they can focus on brainstorming lesson ideas, researching the most recent pedagogical methodologies or just taking a moment to wind down after an undoubtedly stressful day. On the other hand, school administrators want their teachers to produce meaningful lesson plans that are sufficiently comprehensive, so that the cover teacher can still deliver a high-quality lesson, even if the regular teacher is absent, but also to verify that the teacher really is planning their lessons. Finally, cover teachers want to minimise the time spent trying to understand lesson plans, so that they can just focus on delivering the cover lesson on top of the stress that they, too, have to deal with.

### Why teachers plan lessons

When teachers spend less time planning lessons, there tends to be a decline in achieving learning outcomes for the student. While there are many experienced teachers who can walk into a classroom and give a class on seemingly any topic, they themselves seem to be a product of a career of practising lesson planning and striving for continuous improvement. Thus, relying on the "skill" of teachers to improvise lessons, especially newer to intermediate teachers, often results in undesirable consequences for everyone, especially the students.

### How teachers plan lessons

Educational researchers have devised a plethora of methodologies for planning lessons over the years, including understanding by design (UbD), the 4MAT system, the 5E model, differentiated instruction, project-based learning, and universal design for learning (UDL). There is no consensus on which planning model is "the best". Some methodologies focus on maximising educational outcomes for students, while others focus on minimising teacher planning time. However, different geographical regions and academic fields tend to standardise or form a consensus about which model suits their needs best. In EFL instruction in South America (the specific context about which I have lived experience), the most common methodology used by English-language schools is the PPP framework.

### Which teachers this application is for and why it's not for all

Deciding which teachers to help first is not an easy decision. Across the world, communities are struggling to encourage teachers to stay in teaching, and teachers are struggling to find reasons to want to. Educators frequently complain about being underpaid and overworked and, while teachers are not the only ones who are suffering, they are the ones to whom I relate most strongly and find myself best equipped to help. Furthermore, within the broader category of teachers, there is the more defined category of teachers in the developing world. In the UK, a history of social welfare and a developed economy mean that low wages rarely result in destitution. But even in large developing economies like Brazil, many school teachers are forced to live in conditions that would be unimaginable to a school teacher in Britain. Although it is a slippery slope to compare the suffering of people in poverty, economic necessity requires me to start somewhere.

I do not have sufficient experience of the methodologies used by educational institutions across the developing world, but I do have some experience of what it means to be an EFL teacher in Brazil. Therefore, to reduce the complexity and increase the deliverability of this project, the application must deliver, at a minimum, a working solution that makes planning lessons simpler for EFL teachers than if they were to open a word processor and type the entire lesson plan out themselves.

### How the PPP framework works

In the PPP framework, the educator first presents the target language to the student, usually in the form of an activity that implicitly or explicitly reveals a gap in the student's knowledge. For example, a teacher starts the class by showing a video clip in which three friends are having drinks in a café. They are talking about what they have been doing since the last time they met, and in the conversation, they are using the present perfect continuous tense (e.g. "I've been going to spin classes recently"). So, the first phase of the PPP plan involves designing activities that present the target language to students.

Next, the educator facilitates activities that provide the student with opportunities to apply the target language which they have just learned. In the previous example, the student learned about how to talk about what they have been doing recently, so the educator creates an activity in which the student informally interviews and is interviewed by others using questions that elicit those modelled answers. In this way, the student can start making mistakes as soon as possible and with as little pressure as possible. However, the educator may step in now and then to correct mistakes and course correct the student.

Finally, the teacher sets assignments or tasks for the student to utilise the target language in a freer context, in which there is less support and more freedom to potentially make mistakes, revealing gaps in understanding. Traditionally, in continuity with the previous example, the teacher could ask for the student to record an interview with their classmates in a news-reel style video themed around a local story. This gives the student the opportunity to produce a piece of work in which they demonstrate their understanding, and to connect the target language with their personal context.

## Features

**Last Updated**: 2024-06-20

### What this application must be

At its core, this application must provide the user with a way to create a new lesson plan, using the PPP framework, and save it to their profile. Later, they can load the lesson plan and review it. In order to do that, the user must be able to create a secure account and provide a text input within the web application. Equally, the user must be able to edit the lesson plan in case they change their mind about the content later. Finally, it must be free if it is to be a viable option for EFL teachers in the developing world.

### What this application should be

All things being equal, the application should be a faster, more convenient method for writing a lesson plan than if it were written from scratch in a word processor. Moreover, it should automatically format the lesson plan appropriately and make it downloadable in a conventional document file format, such as a PDF, TXT, MD or DOCX file.

### What this application could be

Realistically, there are some additional features that could be implemented into the application, but may not be due to time constraints. For example, it could provide nuanced questions that assist the user in writing a more specific lesson plan, breaking each of the stages down into more readable sections, and reducing the amount of time users spend thinking about what to write.

### What this application will not be

Idealistically, a lesson-planning assistant could be many things. It could have a menu that allows the user to select which planning framework they want to make a lesson plan with, providing the fields to input the relevant data based on that framework. It could be an application that stores a database of pre-made lesson plans which the user searches to find the right lesson plan for them. It could even be an application that utilises an LLM to write a lesson plan based on a sequence of prompt templates. However, due to the initial scope of this project and the limited time frame, Simplifica will not be any of these things in its first iteration.
