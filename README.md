# 🚗 AutoSphere

A comprehensive React Native mobile application for vehicle management, finance tracking, and driving education. AutoSphere helps users manage their vehicles, track expenses, handle insurance, schedule maintenance, and access AI-powered assistance.

## 📱 Features

### Core Modules

#### 🏠 **Dashboard**
- Overview of all vehicle management features
- Quick access to key metrics and recent activities
- Performance analytics and health score display

#### 🚙 **Vehicle Management**
- Add and manage multiple vehicles
- View detailed vehicle profiles
- Track vehicle specifications and configurations
- Vehicle health monitoring

#### 💰 **Finance Management**
- Expense tracking and categorization
- EMI (Equated Monthly Installment) calculator
- Loan application and management
- Payment schedule visualization
- Financial reports and analytics

#### 🔧 **Maintenance**
- Schedule and track vehicle maintenance
- Maintenance history and records
- Service reminders and notifications
- Maintenance cost tracking

#### 🛡️ **Insurance Management**
- Insurance policy tracking
- Claim submission and status monitoring
- Insurance renewal reminders
- Document storage for insurance certificates

#### 📚 **Driving School**
- Book driving lessons with instructors
- View instructor details and ratings
- Track learning progress
- Structured curriculum and lessons
- Performance reports

#### 📝 **Reminders & Notifications**
- Custom reminders for important events
- Insurance and registration renewal alerts
- Maintenance schedule notifications
- Real-time push notifications
- Notification preferences and settings

#### 📄 **Document Wallet**
- Store and organize important documents
- Vehicle registration and insurance documents
- License and permit management
- Secure document upload and retrieval
- Easy sharing and export

#### 🤖 **AI Chat Assistant**
- Real-time AI assistance for vehicle queries
- Maintenance advice and tips
- Finance guidance
- Driving tips and safety information
- Natural language conversations

#### 👤 **User Profile**
- Personal profile management
- Account settings and preferences
- Connected devices management
- Privacy controls
- Password and security settings

#### 🔐 **Authentication**
- Secure login and signup
- Password management
- Password reset functionality
- Device security features

#### 📊 **Analytics & Reports**
- Expense analytics and charts
- Vehicle performance reports
- Fuel efficiency tracking
- Maintenance trends
- Finance overview

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v5+
  - Native Stack Navigator
  - Bottom Tab Navigator
  - Custom navigation architecture
- **State Management**: React Context / AsyncStorage
- **Icon Library**: @expo/vector-icons (Ionicons)
- **Image Handling**: expo-image-picker
- **Local Storage**: AsyncStorage for data persistence
- **Build System**: Expo CLI with Metro bundler

## 📁 Project Structure

```
AutoSphere/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppHeader/       # Header with navigation
│   │   ├── Button/          # Custom button component
│   │   ├── Card/            # Card wrapper component
│   │   ├── Input/           # Input field component
│   │   ├── Loading/         # Loading indicator
│   │   └── [Other Cards]/   # Specific card types
│   ├── screens/             # Application screens (30+ screens)
│   │   ├── Auth/            # Login and authentication
│   │   ├── Dashboard/       # Main dashboard view
│   │   ├── Vehicle/         # Vehicle management
│   │   ├── Finance/         # Finance and expenses
│   │   ├── Insurance/       # Insurance management
│   │   ├── DrivingSchool/   # Driving lessons
│   │   ├── Maintenance/     # Maintenance tracking
│   │   ├── Reminders/       # Reminder management
│   │   ├── AIChat/          # AI chat interface
│   │   ├── DocumentWallet/  # Document storage
│   │   ├── Profile/         # User profile
│   │   └── [More screens]/
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── BottomNavigator.js
│   ├── services/            # Business logic and storage
│   │   ├── storage.js
│   │   ├── aiService.js
│   │   ├── expenseStorage.js
│   │   ├── insuranceStorage.js
│   │   ├── maintenanceStorage.js
│   │   └── [More services]/
│   ├── theme/               # Design tokens
│   │   ├── colors.js
│   │   ├── fonts.js
│   │   ├── spacing.js
│   │   └── index.js
├── assets/                  # Static assets
│   ├── images/              # Image files
│   ├── icons/               # Icon files
│   ├── fonts/               # Custom fonts
│   └── logo/                # App logo
├── App.js                   # Entry point
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
└── index.js                 # Initialization
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ImaraMoh/AutoSphere.git
   cd AutoSphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device or emulator**
   - **iOS**: Press `i` to open iOS simulator
   - **Android**: Press `a` to open Android emulator
   - **Web**: Press `w` to open web browser
   - **Physical Device**: Scan QR code with Expo Go app

## 📚 Available Scripts

```bash
# Start development server with cache reset
npm start -- --reset-cache

# Run on specific platform
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser

# Install dependencies
npm install

# Clean installation
npm ci

#Run Server
cd backend
node server.js
```
Or run in Expo
```bash
npx expo start
npx expo run:android #Android Emulator
npx expo run:ios #ios Simulator
```
## 🎨 Theme & Styling

The app uses a centralized theme system with:
- **Colors**: Primary (#F97316), secondary, success, warning, error
- **Fonts**: Consistent typography across the app
- **Spacing**: Unified spacing scale
- **Dark/Light Mode Support**: Theme switching capability

## 🔄 Navigation Architecture

### Navigation Flow
```
AppNavigator (Root)
└── BottomNavigator (Persistent Tabs)
    ├── HomeStack (Dashboard + Related Screens)
    ├── VehiclesStack (Vehicle Management)
    ├── DocumentsStack (Document Wallet)
    ├── AI Tab (Chat Assistant)
    └── ProfileStack (User Profile)
```

### Key Features
- **Persistent Bottom Navigation**: Tabs visible on all screens
- **Nested Stack Navigation**: Each tab maintains its own navigation history
- **Back Button Handling**: Intelligent back button for non-tab screens
- **Deep Linking Support**: Navigate directly to screens via URLs

## 💾 Data Storage

The app uses **AsyncStorage** for persistent local data:
- User authentication state
- Vehicle information
- Expense records
- Insurance details
- Maintenance history
- Reminders and notifications
- User preferences

## 🤖 AI Assistant Service

The AI Chat feature provides:
- Vehicle maintenance advice
- Finance and EMI guidance
- Driving tips and safety information
- General vehicle-related queries
- Natural language processing

## 📊 Key Components

### Screens (30+)
- Auth, Splash, Dashboard
- Vehicle, AddVehicle, VehicleProfile
- Finance, Expenses, EMICalculator, LoanApplication
- Insurance, RenewInsurance, SubmitClaim
- DrivingSchool, BookLesson, InstructorDetails, LearningProgress
- Maintenance, AddMaintenance
- Reminders, AddReminder
- AIChat, DocumentWallet, UploadDocument
- Profile, EditProfile, ChangePassword, ConnectedDevices
- Notifications, NotificationSettings, NotificationDetails
- Privacy, Reports, PaymentSchedule
- And more...

### Reusable Components
- AppHeader with back button and custom actions
- Custom Button with multiple styles
- Card wrappers for consistent layouts
- Input fields with validation
- Loading indicators
- Specialized cards (ExpenseCard, InsuranceCard, etc.)

## 🔒 Security Features

- Secure authentication system
- Password reset functionality
- Session management
- Privacy controls
- Secure document storage
- Connected device management

## 📱 Supported Platforms

- ✅ iOS (via Expo)
- ✅ Android (via Expo)
- ✅ Web (via Expo Web)

## 🎯 App Icon & Branding

- **Logo**: Custom AutoSphere logo
- **App Icon**: Rounded square logo
- **Splash Screen**: Logo with app name
- **Theme Colors**: Consistent with brand identity

## 🔧 Configuration

### app.json
- App name and slug configuration
- Icon and splash screen settings
- Android and iOS specific settings
- Permissions and capabilities
- Version management

## 🚧 Future Enhancements

- Real-time GPS tracking
- Advanced analytics dashboard
- Cloud synchronization
- Offline mode
- Multi-language support
- Social features
- Integration with vehicle telematics
- Machine learning for predictive maintenance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Guidelines
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Imara Moh**
- GitHub: [@ImaraMoh](https://github.com/ImaraMoh)
- Repository: [AutoSphere](https://github.com/ImaraMoh/AutoSphere)

## 📞 Support

For support, please open an issue on the GitHub repository or contact the author.

## 🙏 Acknowledgments

- React Native and Expo communities
- React Navigation library
- All contributors and users

---

**Happy driving and managing your vehicles with AutoSphere! 🚗✨**
