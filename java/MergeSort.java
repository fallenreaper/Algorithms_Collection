/*
 * Merge Sort Implementation
 */

public class MergeSort {
	
	private int[] array;
	private int length;
	private int[] tempArray;

	public static void main(String[] args) //throws InterruptedException
		{
		int[] itemsToSort = {45,23,11,89,77,98,4,28,65,43};
		System.out.println("Pre-Sort");
		for (int i: itemsToSort){
			System.out.print(i);
			System.out.print(" ");
		}
		System.out.print("\n");
		MergeSort ms = new MergeSort();
		ms.sort(itemsToSort);
		
		System.out.println("PrintOut:");
		for (int i: itemsToSort){
			System.out.print(i);
			System.out.print(" ");
		}
		}

	public void sort( int arr[] ) //throws InterruptedException
		{
		this.array = arr;
		this.length = arr.length;
		this.tempArray = new int[this.length];

		sort(0, this.length -1);
		}

	private void sort ( int lowerBounds, int upperBounds) //throws InterruptedException
		{
		//Thread.sleep(500);
		if (lowerBounds < upperBounds)
			{
			//if ( (upperBounds - lowerBounds) <= 1) return;
			int center = (upperBounds - lowerBounds)/2 + lowerBounds;
			System.out.println("Lower: " + lowerBounds + "\tCenter: " + center + "\tUpper: " + upperBounds);
			sort(lowerBounds, center);
			sort(center + 1, upperBounds);
			merge(lowerBounds,center, upperBounds);
			}
		}

	private void merge ( int lowerBounds, int center, int upperBounds)
		{
		for (int i = lowerBounds; i <= upperBounds; i++)
			{
			tempArray[i] = array[i];
			}

		int i = lowerBounds;
		int j = center + 1;
		int k = lowerBounds;

		while(i <= center && j <= upperBounds)
			{
			if (tempArray[i] <= tempArray[j])
				{
				array[k] = tempArray[i];
				i++;
				}
			else
				{
				array[k] = tempArray[j];
				j++;
				}
			k++;
			}
		while ( i <= center )
			{
			array[k] = tempArray[i];
			k++;
			i++;
			}
		}

}
