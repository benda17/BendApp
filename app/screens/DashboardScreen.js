import React from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-gifted-charts';
import { useClientsData } from '../context/ClientsDataContext.js';
import Carousel from 'react-native-reanimated-carousel';


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
  const ProfitsPast30Days = clientData ? parseCurrency(clientData.ProfitsPast30Days) : 0;
  const ManagementCost30Days = clientData ? parseCurrency(clientData.ManagementCost30Days) : 0;
  const SumOfProducts = clientData ? Number(clientData.AmountOfProducts) : 0;
  const SumOfHours = clientData ? Number(clientData.TotalHoursWorked) : 0;
  const SumOfOrders = clientData ? Number(clientData.SumOfOrders) : 0;

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

  const barData = [
    { value: ManagementCost30Days, label: 'MNG Cost', frontColor: 'blue' },
    { value: ProfitsPast30Days, label: 'Profits', frontColor: '#007ffd' },
  ];

  const carouselData = [
    { title: "כמות המוצרים שהעלנו", content: SumOfProducts },
    { title: "כמות שעות העבודה בחנות", content:  SumOfHours },
    { title: "סך כל המכירות שעשינו בחנות", content:  SumOfOrders, },
    { title: "סך כספי כלל המכירות", content:  profitsNum },
  ];

  // Render Each Slide in the Carousel
  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselContent}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.sign} source={require('../assets/sign.png')} />
        <View>
          <Text style={styles.welcomeText}>הדאשבורד שלך, {userName}</Text>
        </View>

        {/* Metric Card for overall sales */}
        <View style={styles.metricContainer}>
          <MetricCard title={"סך כל המכירות שלך"} value={clientData ? clientData.SumOfSales : 0} />
        </View>

        {/* Metric Card containing the graph and text */}
        <View style={styles.metricContainer}>
          <MetricCard title="יחסי מכירות ורווחים">
            <View style={styles.chartContainer}>
              <BarChart
                width={chartWidth}
                barWidth={50}
                spacing={40}
                barBorderRadius={6}
                noOfSections={4}
                stackData={stackData}
                xAxisLabelsHeight={50}
                yAxisColor={'#fff'}
                xAxisColor={'#fff'}
                yAxisTextStyle={{ color: '#007ffd', fontSize: 12 }}
                xAxisTextStyle={{ color: '#007ffd', fontSize: 12 }}
                xAxisLabelTextStyle={{ color: '#007ffd', fontSize: 12 }}
              />
            </View>
            <Text style={styles.metricExtraText}>Profits out of Sales</Text>
            <Text style={styles.metricExtraText}>Orders out of Sales</Text>
          </MetricCard>
        </View>

        <View style={styles.metricContainer}>
          <MetricCard title={"סך הרווחים שלך"} value={clientData.SumOfProfits} />
        </View>
        <View style={styles.metricContainer}>
          <MetricCard title={"נתונים כללים..."} />
        </View>

        {/* Improved Bar Chart Metric Card */}
        <View style={styles.metricContainer}>
          <MetricCard title={"רווחים וניהול - 30 ימים"}>
            <View style={styles.horizontalChartContainer}>
              <BarChart
                barWidth={50}
                barBorderRadius={8}
                data={barData}
                spacing={45} // Add spacing between bars
                xAxisColor={'#fff'}
                yAxisColor={'#fff'}
                yAxisTextStyle={{ color: '#007ffd', fontSize: 12 }}
                xAxisTextStyle={{ color: '#007ffd', fontSize: 12 }}
                xAxisLabelTextStyle={{ color: '#007ffd', fontSize: 12 }}
              />
            </View>
            <Text style={styles.metricExtraText}>Management Cost 30 Days</Text>
            <Text style={styles.metricExtraText}>Profits 30 Days</Text>
          </MetricCard>  
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={() => Linking.openURL('https://wa.link/nuj0ca')}>
            <Text style={styles.signUpText}>להורדת פורטפוליו ההשקעה (בקרוב...)</Text>
        </TouchableOpacity>  
        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>נתונים נוספים</Text>
          <Text style={styles.sectionText}>גללו ימינה ושמאלה</Text>
          <Carousel
            loop
            width={screenWidth * 0.9} 
            height={150}  
            data={carouselData}
            autoPlay={true}
            autoPlayInterval={3000}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => renderCarouselItem({ item })}
          />
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
  // Standard chart container
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 10,
  },
  // Improved styling for horizontal chart
  horizontalChartContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
    overflow: 'hidden',
    color: '#fff',
  },
  metricContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  metricCardShadow: {
    width: '90%',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#212121',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  metricCard: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007FFD',
    marginTop: 5,
    textAlign: 'center',
  },
  metricExtraText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  carouselContainer: {
    marginVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#212121',
  },
  sectionText: {
    fontSize: 16,
    color: '#212121',
    textAlign: 'center',
    marginBottom: 10,
  },
  carouselItem: {
    backgroundColor: '#007FFD',
    borderRadius: 12,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  carouselContent: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  sign: { 
    width: 80,
    height: 80, 
    resizeMode: 'contain',
    transform: [{ rotate: '0deg' }],
  },
  signUpButton: { marginTop: 10, width: "90%", height: 50, borderWidth: 1, borderColor: "black", backgroundColor: 'white', borderRadius: 25, alignSelf: 'center', justifyContent: "center", alignItems: "center" },
  signInText: { fontSize: 18, fontWeight: "bold", color: "white" },
  signUpText: { fontSize: 18, color: "black" },
});

export default DashboardScreen;
