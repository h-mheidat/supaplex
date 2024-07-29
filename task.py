x=[3,5,4,4,3,1,3,2]
x.reverse()
max=0
c=[]

for i in range(len(x)):
    if(x[i]>max):
        c.append(x[i])
        max=x[i]
c.reverse()
print(c)
