// screens/DietPlanScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const vegPlan = {
  Monday: ['Oats with fruits', 'Vegetable soup', 'Steamed veggies with brown rice'],
  Tuesday: ['Upma with nuts', 'Dal + chapati', 'Quinoa salad'],
  Wednesday: ['Idli + sambar', 'Lentil soup', 'Mixed veg curry with rice'],
  Thursday: ['Poha + curd', 'Tofu curry', 'Veg sandwich with whole wheat bread'],
  Friday: ['Fruit smoothie', 'Spinach dal', 'Boiled chana + roti'],
  Saturday: ['Multigrain dosa', 'Kadhi + rice', 'Paneer bhurji'],
  Sunday: ['Muesli + milk', 'Veg pulao', 'Stuffed paratha with curd'],
};

const nonVegPlan = {
  Monday: ['Boiled eggs + toast', 'Grilled chicken salad', 'Fish curry with rice'],
  Tuesday: ['Omelette + oats', 'Chicken stew + bread', 'Boiled eggs with roti'],
  Wednesday: ['Egg sandwich', 'Fish fry + salad', 'Chicken pulao'],
  Thursday: ['Scrambled eggs', 'Egg curry + chapati', 'Chicken stir fry'],
  Friday: ['Protein smoothie', 'Grilled fish', 'Tandoori chicken + salad'],
  Saturday: ['Egg dosa', 'Chicken biryani (light)', 'Fish tikka'],
  Sunday: ['Boiled egg + toast', 'Mutton soup (light)', 'Lemon grilled chicken'],
};

const DietPlanScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'veg' | 'nonveg' | null>(null);

  const renderChart = (plan: Record<string, string[]>) => {
    return Object.entries(plan).map(([day, meals]) => (
      <View key={day} style={styles.card}>
        <Text style={styles.day}>{day}</Text>
        {meals.map((meal, index) => (
          <Text key={index} style={styles.meal}>🍽 {meal}</Text>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weekly Diet Plan</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, selectedType === 'veg' && styles.activeButton]}
          onPress={() => setSelectedType('veg')}
        >
          <Text style={styles.buttonText}>🥦 Vegetarian</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedType === 'nonveg' && styles.activeButton]}
          onPress={() => setSelectedType('nonveg')}
        >
          <Text style={styles.buttonText}>🍗 Non-Vegetarian</Text>
        </TouchableOpacity>
      </View>

      {selectedType === 'veg' && renderChart(vegPlan)}
      {selectedType === 'nonveg' && renderChart(nonVegPlan)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fcff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#cccccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: '#4E9F3D',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#eaf8ee',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  day: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#2e3a59',
  },
  meal: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
});

export default DietPlanScreen;