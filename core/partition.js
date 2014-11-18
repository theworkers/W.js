function partition ( arr, size ) {
    return arr.reduce( toPartition( size ), [] );
}