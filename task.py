array = [3,5,4,4,3,1,3,2,].py
array = [3,5,4,4,3,1,3,2,]
newarray = []
mx = 0
for i in range(len(array)-1, -1 , -1):
    if array[i]>mx:
        newarray.append(array[i])
        mx = array[i]
        newarray.reverse()
        print(newarray)


        
