// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './app/therapy/HomeScreen';
import TherapyScreen from './app/therapy/TherapyScreen';
import DietPlanScreen from './app/therapy/DietPlanScreen';
import ScheduleChartScreen from './app/therapy/ScheduleChartScreen';
//import MoodTracker from './app/therapy/MoodTracker'; // ✅ Import
import ReminderScreen from './app/therapy/RemainderScreen';

export type RootStackParamList = {
  Home: undefined;
  Therapy: undefined;
  DietPlan: undefined;
  Reminder: undefined;
  ScheduleChart: { condition: string };
  MoodTracker: undefined; // ✅ Add route type
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Veloria Home' }} />
        <Stack.Screen name="Therapy" component={TherapyScreen} />
        <Stack.Screen name="DietPlan" component={DietPlanScreen} />
        <Stack.Screen name="Reminder" component={ReminderScreen} />
        <Stack.Screen name="ScheduleChart" component={ScheduleChartScreen} />
        {/* <Stack.Screen name="MoodTracker" component={MoodTracker} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}