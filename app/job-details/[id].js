import React from "react";
import { Text, SafeAreaView, View, ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics, } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";


const tabs = [ "About", "Qualifications", "Responsibilities" ]


const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const [ refresh, setRefresh ] = useState(false)
  const [ active, setActive ] = useState(tabs[0])
  const onRefresh = useCallback(() => {
    setRefresh(true)
    refetch()
    setRefresh(false)
  }, [])

  
  const displayContent = () => {
    switch(active) {
        case "Qualifications": 
            return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A'] }/>;
        
        case "About":
            return <JobAbout info={data[0].job_description ?? "No data provided"}/>

        case "Responsibilities":
            return <Specifics title="Responsibilities" points={data[0].job_highlights?.Responsibilities ?? ['N/A'] }/>;
            
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      >

        <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}>
                { isLoading ? ( <ActivityIndicator size={SIZES.large} color={COLORS.primary}/> ) : error ? <Text>Something went wrong..</Text> : 
                data.length === 0 ? (
                    <Text> No data </Text>
                ) : <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                    <Company
                        companyLogo={data[0].employer_logo}
                        jobTitle={data[0].job_title}
                        companyName={data[0].employer_name}
                        location={data[0].job_country}

                    />
                    <JobTabs
                        tabs={tabs}
                        activeTab={active}
                        setActiveTab={setActive}
                    />

                    { displayContent() }
                    
                </View> }
            </ScrollView>

            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>
        </>

      </Stack.Screen>
    </SafeAreaView>
  );
};

export default JobDetails;
