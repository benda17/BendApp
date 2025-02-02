import React from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-gifted-charts';
import { useClientsData } from '../../ClientsDataContext.js';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 0.9 - 40;

// Helper to parse currency strings (e.g. "$1,234") into numbers
const parseCurrency = (value) => {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  return Number(value.replace(/[^0-9.-]+/g, ""));
};

function DashboardScreen(props) {
  const { clientData, userName } = useClientsData();

  // Convert formatted values into numbers
  const salesNum = clientData ? parseCurrency(clientData.SumOfSales) : 0;
  const profitsNum = clientData ? parseCurrency(clientData.SumOfProfits) : 0;
  const ordersNum = clientData ? Number(clientData.SumOfOrders) : 0;

  // Stacked bar data
  const stackData = [
    {
      stacks: [
        { value: profitsNum, color: 'blue' },
        { value: Math.max(salesNum - profitsNum, 0), color: '#007FFD', marginBottom: 3 },
      ],
      label: 'P vs S',
    },
    {
      stacks: [
        { value: ordersNum, color: 'blue' },
        { value: Math.max(salesNum - ordersNum, 0), color: '#007FFD', marginBottom: 3 },
      ],
      label: 'O vs S',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.welcomeText}>הדאשבורד שלך, {userName}</Text>
        </View>

        {/* Metric Card for overall sales */}
        <View style={styles.metricContainer}>
          <MetricCard title={"סך כל המכירות שלך"} value={clientData ? clientData.SumOfSales : 0} />
        </View>

        {/* Metric Card containing the graph and text */}
        <View style={styles.metricContainer}>
          <MetricCard title="קצת על מכירות ורווחים...">
            <View style={styles.chartContainer}>
              <BarChart
                width={chartWidth}
                barWidth={45}
                spacing={50}
                barBorderRadius={6}
                noOfSections={4}
                stackData={stackData}
                xAxisLabelsHeight={50} // ✅ Increase label height
              />
            </View>

            {/* Ensure the text is inside the MetricCard */}
            <Text style={styles.metricExtraText}>PROFITS out of SALES</Text>
            <Text style={styles.metricExtraText}>ORDERS out of SALES</Text>
          </MetricCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// MetricCard component with an outer shadow wrapper
const MetricCard = ({ title, value, children }) => (
  <View style={styles.metricCardShadow}>
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      {value !== undefined && <Text style={styles.metricValue}>{value}</Text>}
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  // ✅ Removed height restriction so text and chart fit naturally
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    overflow: 'hidden'
  },
  metricContainer: {
    margin: 5,
    width: '100%',
    alignItems: 'center',
  },

  metricCardShadow: {
    width: '90%',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Inner container holds the card content
  metricCard: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007FFD',
    marginTop: 8,
    textAlign: 'center',
  },
  // ✅ Ensures the extra text inside the card is visible
  metricExtraText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
  },
});

export default DashboardScreen;
