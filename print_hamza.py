x = [3,5,4,4,3,1,3,2]
x.reverse()
max=0
output=[]
#[2,3,1,3,4,4,5,3]
i=0
for  i in range(len(x)) :
    if x[i] >max:
        output.append(x[i])
        max = x[i] 
    i +=1
output.reverse()
print(output)