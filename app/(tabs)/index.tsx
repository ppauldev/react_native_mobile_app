import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(() => getTrendingMovies());

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ""
  }));

  const renderHeader = () => (
    <View className="px-5">
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
      <View className="mt-5">
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
          value=""
          onChangeText={() => {}}
        />
        {trendingMovies && (
          <View className="mt-10">
            <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-4" />}
              className="mb-4 mt-3"
              data={trendingMovies}
              renderItem={({ item, index }) => (
                <Text className="text-white text-sm">
                  <TrendingCard movie={item} index={index} />
                </Text>
              )}
              keyExtractor={(item, index) => (item as any).$id || `${item.movie_id}-${index}`}
            />
          </View>
        )}
        <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
      </View>
    </View>
  );

  if (trendingLoading || moviesLoading) {
    return (
      <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0"/>
        <ActivityIndicator
          size="large"
          color="#0000FF"
          className="mt-10 self-center"
        />
      </View>
    );
  }

  if (trendingError || moviesError) {
    return (
      <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0"/>
        <Text className="text-white px-5 mt-10">Error: {trendingError?.message || moviesError?.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"/>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
          paddingLeft: 20
        }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => <View className="h-32" />}
        contentContainerStyle={{
          paddingBottom: 10
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
