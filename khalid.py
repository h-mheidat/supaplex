array =[3,5,4,4,3,1,3,2]
array1=[]
max=0
for i in range(len(array)-1,-1,-1):
if array[i]>max:
array1.append(array[i])
max =array[i]
array1.reverse()
print(array1)