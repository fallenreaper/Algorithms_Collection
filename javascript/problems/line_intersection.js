

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(ptA, ptB){
        this.start = ptA;
        this.end = ptB
    }

    intersects(line){
        // y = mx + b
        //  AKA
        // y - mx = b
        let bthis = this.start.y - this.getSlope() * this.start.x;
        let bline = line.start.y - line.getSlope() * line.start.x;

        console.log(`This Slope: ${bthis}\nOther Slope: ${bline}`)
        //ax+c == xb+d
        //ax-bx == d-c
        //x(a-b) == d-c
        // x == (d-c)/a-b)

        // y == a(d-c)/(a-b) + c

        // 1 = this.
        // x = (b1-b1)/(m2-m1)
        // y = (b1m2 - b2m1) / (m2-m1)
        
        let mo = this.getSlope();
        let xIntercept = (bthis-bline)/(line.getSlope() - mo);
        let yIntersect = (bthis*line.getSlope() - bline*mo)/ (line.getSlope() - mo)
        if ((line.getSlope() - mo) == 0) return null;
        return new Point(xIntercept, yIntersect);
    }

    getSlope(){
        let rise = (this.start.y - this.end.y);
        let run = (this.start.x - this.end.x);
        return rise/run;
    }
}


function main(){
    let a = new Line(new Point(0,2), new Point(2,0));
    let b = new Line(new Point(-3,-3), new Point(3,3));
    console.log(`Slope of A: ${a.getSlope()}`);
    console.log(`Slope of B: ${b.getSlope()}`)
    console.log(a.intersects(b))
}
main()