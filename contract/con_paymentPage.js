import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { PackageCard, ProfilePackageCard } from './pricePackage';
import welcome from  '../contract/utility/img/welcome.png'
import LocalText from '../contract/utility/comp/LocalText';
import HomeHeader from './utility/comp/header';
export   const packages = [
  {
    title: 'Annually',
    price: '$4500',
    frequency: '/Annually',
    saveText: 'Saving Plan',
    features: [
      'Unlimited Contract Creation',
      'Add Milestones',
      'Set Up Payment Plans',
      'Make your own team',
      'Add Sub-Contractors',
      'E-Sign the Contract Document',
      'Free Download',
      'Anytime Anywhere access to your Unlimited Contracts',
    ],
    subTitle:'A Saving of $200',
    buttonText: 'Start Your 30 Days Free Trial',
  },
  {
      title: 'Monthly',
      price: '$364',
      frequency: '/Monthly',
      features: [
        'Unlimited Contract Creation',
        'Add Milestones',
        'Set Up Payment Plans',
        'Make your own team',
        'Add Sub-Contractors',
        'E-Sign the Contract Document',
        'Free Download',
      'Anytime Anywhere access to your Unlimited Contracts',

      ],
      subTitle:'First Payment of $696',
      buttonText: 'Start Your 30 Days Free Trial',
    },
];
export default function App() {
  
  return (
    <View style={{
        flex:1,
        paddingBottom:20
    }}>
        <HomeHeader title={'Contract'} subTitle={`Welcome to The Tradesmen's Collective`} />
  <ScrollView style={styles.container}>
   

   
      <View style={styles.heroSection}>
        <Image
          style={styles.heroImage}
          source={welcome}
        />
        <LocalText style={styles.heroTitle}>Welcome to the Tradesmen's Collective</LocalText>
        <LocalText style={styles.heroText}>
          The Tradesmen's Collective has made it easier for contractors to
          create and share digital contracts.
           {/* Start your 30-days free trial
          today! */}
        </LocalText>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <LocalText style={styles.sectionTitle}>Features</LocalText>
        <View style={styles.featuresGrid}>
          {[
            { title: 'Unlimited Contracts', icon: '📝' },
            { title: 'Free Downloads', icon: '📤' },
            { title: 'Add Milestones', icon: '📊' },
            { title: 'Add Sub-contractors', icon: '👷‍♂️' },
            { title: 'Schedule Payments', icon: '⏳' },
            { title: 'Dedicated Website', icon: '🌐' },
            { title: 'Privacy Guaranteed', icon: '🔒' },
            { title: 'Social Media Marketing', icon: '📱' },
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <LocalText style={styles.featureText}>{feature.title}</LocalText>
            </View>
          ))}
        </View>
      </View>

 

      {/* Packages Section */}
      {/* <View style={styles.packagesSection}>
        <LocalText style={styles.sectionTitle}>Packages</LocalText>
        {packages.map((pkg, index) => (
        <ProfilePackageCard
          key={index}
          subTitle={pkg.subTitle}
          title={pkg.title}
          bg={'#28A745'}
          price={pkg.price}
          frequency={pkg.frequency}
          saveText={pkg.saveText}
          features={pkg.features}
          buttonText={pkg.buttonText}
          onButtonPress={() => {
            Alert.alert('Alert',"You can purchase it from web portal")
          }}
        />
      ))}
      </View> */}

 
    </ScrollView>
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerLink: {
    fontSize: 16,
    color: '#007BFF',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  featuresSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  termsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#555',
  },
  link: {
    color: '#007BFF',
  },
  packagesSection: {
    marginBottom: 20,
  },
  packages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  packageCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 5,
  },
  packageSave: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mainCTAButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  mainCTAButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
