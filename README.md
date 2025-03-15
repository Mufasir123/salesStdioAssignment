# Sales Studio Assignment - Next.js Project
LiveProjectLink:- (https://sales-stdio-assignment.vercel.app/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It includes a user interface for claiming coupons and an admin panel for managing coupons. The project uses MongoDB for data storage and tracks users via their IP address and session ID.

---

## Getting Started

To get started with the project, follow the steps below:

### 1. Install Dependencies
Before running the project, ensure all dependencies are installed. Run the following command in your terminal:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Run the Development Server
Once dependencies are installed, start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Project Overview

### Home Page
The home page allows users to claim coupons. To claim a coupon:
1. **Accept Cookies**: The user must accept cookies to enable the "Claim" button. If cookies are not accepted, the button will remain disabled.
2. **Reload the Page**: After accepting cookies, reload the page to activate the "Claim" button.
3. **Claim Coupon**: Click the "Claim" button to claim a coupon. A success message will appear, and the coupon will be stored.

![Home Page](https://github.com/Mufasir123/salesStdioAssignment/blob/main/1.jpeg?raw=true)

### Claimed Coupons Page
After claiming a coupon, navigate to the "Claimed Coupons" page via the navbar to view all claimed coupons.

![Claimed Coupons Page](https://github.com/Mufasir123/salesStdioAssignment/blob/main/3%20climed%20coupon.jpeg?raw=true)

### Error Handling
- If a user tries to claim a coupon within 1 hour of their last claim, an error message will be displayed.
  
![Claiming Error](https://github.com/Mufasir123/salesStdioAssignment/blob/main/4%20claiming%20error.png?raw=true)

---

## Admin Panel

The admin panel allows administrators to manage coupons. To access the admin panel, use the following URL:

```
https://sales-stdio-assignment-nullz3i95-mufasir123s-projects.vercel.app/admin
```

### Admin Home Page
The admin home page provides an overview of the system.

![Admin Home Page](https://github.com/Mufasir123/salesStdioAssignment/blob/main/5%20admin%20home%20page.jpeg?raw=true)

### Add Coupon Form
Admins can add new coupons by filling out the form and clicking the "Add Coupon" button. A success message will confirm the coupon has been added.

![Add Coupon Form](https://github.com/Mufasir123/salesStdioAssignment/blob/main/6%20form%20fill.png?raw=true)

![Coupon Added Successfully](https://github.com/Mufasir123/salesStdioAssignment/blob/main/7%20add%20coupon.png?raw=true)

---

## Project Structure and Logic

### File Structure
The project is organized into the following directories:
- **APIs**: Contains all backend logic and MongoDB schemas.
- **Components**: Includes reusable UI components.

### Backend Logic
1. **User Tracking**: The user's IP address and session ID are stored in LocalStorage to track coupon claiming status.
2. **Coupon Management**:
   - Backend APIs are created for claiming coupons and adding new coupons via the admin panel.
   - A 1-hour cooldown is implemented to prevent users from claiming multiple coupons within a short timeframe.

### Technologies Used
- **Frontend**: Next.js, React
- **Backend**: Node.js, MongoDB
- **Styling**: CSS or any preferred styling library (not specified in the provided information)

---

## Screenshots

1. **Dependencies Installation**  
   ![Dependencies](https://github.com/Mufasir123/salesStdioAssignment/blob/main/0%20dependencies%20image.png?raw=true)

2. **Home Page**  
   ![Home Page](https://github.com/Mufasir123/salesStdioAssignment/blob/main/1.jpeg?raw=true)

3. **Claimed Coupons Page**  
   ![Claimed Coupons](https://github.com/Mufasir123/salesStdioAssignment/blob/main/3%20climed%20coupon.jpeg?raw=true)

4. **Claiming Error**  
   ![Claiming Error](https://github.com/Mufasir123/salesStdioAssignment/blob/main/4%20claiming%20error.png?raw=true)

5. **Admin Home Page**  
   ![Admin Home Page](https://github.com/Mufasir123/salesStdioAssignment/blob/main/5%20admin%20home%20page.jpeg?raw=true)

6. **Add Coupon Form**  
   ![Add Coupon Form](https://github.com/Mufasir123/salesStdioAssignment/blob/main/6%20form%20fill.png?raw=true)

7. **Coupon Added Successfully**  
   ![Coupon Added](https://github.com/Mufasir123/salesStdioAssignment/blob/main/7%20add%20coupon.png?raw=true)
