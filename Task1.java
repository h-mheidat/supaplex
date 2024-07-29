import java.util.*;

public class Task1 {
public static void main(String args[]) {
int[] a = {3, 5 , 4, 4, 3, 1, 3, 2};

int max = a[a.length-1];
ArrayList<Integer> answer = new ArrayList<Integer>();
answer.add(a[a.length-1]);

for (int i = a.length - 2; i >= 0; i--){
if (a[i] > max) {
max = a[i];
answer.add(a[i]);




}


}
System.out.println(answer.toString());
} }
