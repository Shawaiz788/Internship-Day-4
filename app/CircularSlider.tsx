import React, { useState } from "react";
import { View,Text, Dimensions,Image,FlatList,StyleSheet } from "react-native";
import Animated, {
    clamp,
    FadeIn,
    interpolate,
    interpolateColor,
    runOnJS,
    SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const images = [
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/800/400?random=2",
  "https://picsum.photos/800/400?random=3",
  "https://picsum.photos/800/400?random=4",
  "https://picsum.photos/800/400?random=5",
  "https://picsum.photos/800/400?random=6",
  "https://picsum.photos/800/400?random=7",
];

const {width} = Dimensions.get('window');
const _itemSize = width*0.24;
const _spacing=12
const _itemTotalSize=_itemSize+_spacing;

function CarouselItem({
    imageUri,
    index,
    scrollX
}:{
    imageUri:string,
    index:number
    scrollX:SharedValue<number>
}){

    const stylez=useAnimatedStyle(()=>{
        return{
            borderWidth:4,
            borderRadius:_itemSize/2,
            borderColor:interpolateColor(scrollX.value,
                    [index-1,index,index+1],
                    ["transparent","white","transparent"]),
            transform:[{
                translateY:interpolate(scrollX.value,
                    [index-1,index,index+1],
                    [_itemSize/3,0,_itemSize/3])
            }]
        }
    });
    return (<Animated.View  style={[{
        width:_itemSize,
        height:_itemSize}
        ,stylez]}>
                <Image 
                source={{uri:imageUri}} 
                style={{flex:1,borderRadius:_itemSize/2}}/>
            </Animated.View>
    )
}

export function CircularSlider() {
    const scrollX=useSharedValue(0);
    const [activeIndex,setActiveIndex]=useState(0);
    //custom onScroll to track x position of the scroll and update scrollX value accordingly
    const onScroll=useAnimatedScrollHandler(e=>{
        scrollX.value=clamp(e.contentOffset.x/_itemTotalSize,0,images.length-1);
        const newActiveIndex=Math.round(scrollX.value);
        if(activeIndex!==newActiveIndex){
            runOnJS (setActiveIndex)(newActiveIndex);
        }
    });
  return (
    <View style={{flex:1,justifyContent:'flex-end'}}>
        <View
        style={[StyleSheet.absoluteFillObject]}>
            <Animated.Image
            entering={FadeIn.duration(500)}
            exiting={FadeIn.duration(500)}
            key={`image-${activeIndex}`}
            source={{uri:images[activeIndex]}}
            style={{flex:1}}
            />
        </View>
        <Animated.FlatList
        style={{flexGrow:0,height:_itemSize*2}}
        contentContainerStyle={{paddingHorizontal:(width-_itemSize)/2,gap:_spacing}} //starting position of the first item and gap between items
         data={images} 
        keyExtractor={(_,index)=>String(index)} 
        renderItem={({item,index})=>{ //how each item renders
            return <CarouselItem imageUri={item} index={index} scrollX={scrollX}/>
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll} //scroll event handler
        scrollEventThrottle={1000/60} //60fps 1000/60=16ms
        snapToInterval={_itemTotalSize} //snap to each item
        decelerationRate="fast" //fast deceleration for better snapping
        />
    </View>
  );
}