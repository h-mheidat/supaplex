x = [3,5,4,4,3,1,3,2]
x.reverse()
y=0
c=[]
i=0
for i in range(len(x)):
    if x[i] >y:
        c.append(x[i])
        y = x[i]
        i+=1

c.reverse()
print(c)