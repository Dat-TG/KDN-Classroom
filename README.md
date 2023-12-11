# KDN Classroom

Classroom Management Tools & Resources

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)

## About

Final project

Advanced Web Programming

### Tech Stack
- Front-end: Reactjs, Material UI, react-router, react-hook-form
- Back-end: Nestjs, Postgres, Cloudinary, Passportjs

## Deployment

Front-end: https://kdn-classroom.netlify.app/

Back-end: https://web-advanced-server-v2.onrender.com

## Demo Video

GA02: Youtube: https://youtu.be/poKaQUmJOx8

GA01: Youtube: https://youtu.be/GIjBgv-85Ls

Midterm: Youtube: https://youtu.be/Db7cxGFMyI8

## Installation

```
git clone https://github.com/Dat-TG/AdvancedWebFinalProject.git
```

## Usage

```
npm install
npm run dev
```

Then create a `.env.local` file with these variables:

```
VITE_REACT_APP_BASE_URL=https://web-advanced-server-v2.onrender.com/api
VITE_REACT_APP_PORT=5173
VITE_REACT_APP_GOOGLE_CLIENT_ID=405078031478-2ijmsuolss017s9egteko00bhro73lpc.apps.googleusercontent.com
VITE_REACT_APP_FACEBOOK_APP_ID=1143865149911728
```

Then goto http://localhost:5173/

## Features

### User Navigation
- Users can navigate between the Landing page, Sign Up, Sign In, Home page, and Profile page.

### React UI Framework
- Utilizes a React UI Framework for the project's user interface, ensuring a responsive and modern design.

### Authentication Flow
- Sign Up
- Sign In with email and password
- Sign In with Google
- Sign In with Facebook
- Account activation by email
- Verify access token
- Refresh token
- Sign out
- Managing sign-in and sign-out UI states for users
- Restrict feature access based on the user’s role

### User Profile Management
Users can edit:
- Profile information: firstname, lastname
- Change password
- Forgot password
- Reset password by email
- Upload avatar
- Edit avatar: crop, rotate, zoom in, zoom out

### Teacher

#### Class management
- Create class
- List classes
- Show class details
- Show list of teachers and students in class

#### Class invitation
- Create a class invitation link and join class by link
- Invite student by email
- Invite teacher by email

### Student

#### Join class
- By code
- By invitation link

### Public Hosting
- Includes functionality to upload projects to a public host, facilitating easy sharing and accessibility.

## Contributing

This project was created and is actively maintained by:

- [19120260 Hoàng Trần Thiên Khôi](https://github.com/thienkhoi0604/)
- [20120454 Lê Công Đắt](https://github.com/dat-tg)
- [20120537 Hồ Trung Nguyên](https://github.com/hotrungnguyen76)
